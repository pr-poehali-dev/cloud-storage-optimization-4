import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Поиск участников конкурсов по ФИО и городу."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    params = event.get('queryStringParameters') or {}
    surname = params.get('surname', '').strip()
    name = params.get('name', '').strip()
    patronymic = params.get('patronymic', '').strip()
    city = params.get('city', '').strip()

    if not any([surname, name, patronymic, city]):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите хотя бы один параметр поиска'}, ensure_ascii=False)
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    conditions = []
    values = []

    if surname:
        conditions.append("LOWER(p.surname) LIKE LOWER(%s)")
        values.append(f'%{surname}%')
    if name:
        conditions.append("LOWER(p.name) LIKE LOWER(%s)")
        values.append(f'%{name}%')
    if patronymic:
        conditions.append("LOWER(p.patronymic) LIKE LOWER(%s)")
        values.append(f'%{patronymic}%')
    if city:
        conditions.append("LOWER(p.city) LIKE LOWER(%s)")
        values.append(f'%{city}%')

    where = ' AND '.join(conditions)

    cur.execute(f"""
        SELECT
            p.id,
            p.surname,
            p.name,
            p.patronymic,
            p.city,
            c.title AS contest_title,
            c.city AS contest_city,
            c.held_date,
            pc.place,
            pc.score
        FROM participants p
        JOIN participant_contests pc ON pc.participant_id = p.id
        JOIN contests c ON c.id = pc.contest_id
        WHERE {where}
        ORDER BY p.surname, p.name, c.held_date DESC
    """, values)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    participants = {}
    for row in rows:
        pid = row[0]
        if pid not in participants:
            participants[pid] = {
                'id': pid,
                'surname': row[1],
                'name': row[2],
                'patronymic': row[3],
                'city': row[4],
                'contests': []
            }
        held_date = row[7].strftime('%d.%m.%Y') if row[7] else None
        participants[pid]['contests'].append({
            'title': row[5],
            'city': row[6],
            'held_date': held_date,
            'place': row[8],
            'score': float(row[9]) if row[9] else None
        })

    result = list(participants.values())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'participants': result, 'total': len(result)}, ensure_ascii=False)
    }
