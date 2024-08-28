import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const thinkificApiKey = authHeader?.replace('Bearer ', '');

    if (thinkificApiKey !== process.env.THINKIFIC_API_KEY) {
        throw new Error('Unauthorized');
    }

    const body = await req.text();
    const data = JSON.parse(body);
    const { firstName, lastName, email, course_id } = data;

    const thinkificSubdomain = process.env.THINKIFIC_SUBDOMAIN;
    const thinkificBaseUrl = process.env.THINKIFIC_BASE_URL;
    const thinkificEnrollUrl = process.env.THINKIFIC_BASE_URL + '/enrollments';
    const thinkificUsersUrl = process.env.THINKIFIC_BASE_URL + `/users?page=1&limit=1&query%5Bemail%5D=${data.email}`;

    if (!email) {
        return NextResponse.error();
    }

    try {

        let userID = '';

        // Get user id from email
        const userResponse = await fetch(thinkificUsersUrl, {
            method: 'GET',
            headers: <HeadersInit>{
                'X-Auth-API-Key': thinkificApiKey,
                'X-Auth-Subdomain': thinkificSubdomain,
                'Content-Type': 'application/json',
            }
        })

        console.log('User Response:', userResponse);

        if (userResponse.status !== 200) {
            throw new Error('Something went wrong with the user request');
        }

        const userData = await userResponse.json();

        console.log('User Data:', userData);

        if (userData.items.length === 0) {
            // create user if not found
            const createUserResponse = await fetch(thinkificBaseUrl + '/users', {
                method: 'POST',
                headers: <HeadersInit>{
                    'X-Auth-API-Key': thinkificApiKey,
                    'X-Auth-Subdomain': thinkificSubdomain,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    send_welcome_email: true,
                    skip_custom_fields_validation: true,
                }),
            })

            if (createUserResponse.status !== 201) {
                throw new Error('Something went wrong with the user creation');
            }

            console.log('Create User Response:', createUserResponse);

            const createUserData = await createUserResponse.json();

            console.log('Create User Data:', createUserData);

            userID = createUserData.id;
            
        } else {
            userID = userData.items[0].id;
        }

        console.log('User ID:', userID);
        console.log('Course ID:', course_id);


        // enroll user in the course
        const enrollmentResponse = await fetch(thinkificEnrollUrl, {
            method: 'POST',
            headers: <HeadersInit>{
                'X-Auth-API-Key': thinkificApiKey,
                'X-Auth-Subdomain': thinkificSubdomain,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course_id: course_id,
                user_id: userID,
            }),
        })

        console.log('Enrollment Response:', enrollmentResponse);

        if (enrollmentResponse.status === 201) {
            return NextResponse.json({ status: 'fulfilled', message: 'Data sent successfully' });
        } else {
            throw new Error('Enroll Failed');
        }
    } catch (error) {
        console.error('Enroll Failed:', error);
        return NextResponse.error();
    }
}