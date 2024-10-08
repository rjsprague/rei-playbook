import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
    message: string;
}

interface FailureAlertProps {
    firstName: string;
    apiEndpoint: string;
    name: string;
    email: string;
    phone: string;
    course: string;
    one_free_course: boolean;
    client_id: string;
    ip: string;
    device: string;
    campaign: string;
    source: string;
    term: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message,
}) => (
  <div>
    <p>Hey, {firstName}!</p>
    <p>{message}</p>
  </div>
);

export const FailureAlert: React.FC<Readonly<FailureAlertProps>> = ({
    apiEndpoint,
    name,
    email,
    phone,
    course,
    one_free_course,
    client_id,
    ip,
    device,
    campaign,
    source,
    term,
}) => (
    <div>
        <p>Hey, Ryan!</p>
        <p>Failed to send data to {apiEndpoint}</p>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Course: {course}</p>
        <p>One Free Course: {one_free_course}</p>
        <p>Client ID: {client_id}</p>
        <p>IP: {ip}</p>
        <p>Device: {device}</p>
        <p>UTM Campaign: {campaign}</p>
        <p>UTM Source: {source}</p>
        <p>UTM Term: {term}</p>
    </div>
);