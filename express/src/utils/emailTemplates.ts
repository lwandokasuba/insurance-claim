import { Claim, User } from "@prisma/client";

export const claimCreatedEmail = (claim: Claim & { user: User }) => {
  const date = new Date();
  return {
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claim Created</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #007bff;
            margin-top: 0;
        }
        p {
            margin-bottom: 16px;
        }
        .claim-details {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            background-color: #ffffff;
        }
        .detail-item {
            margin-bottom: 8px;
        }
        .strong {
            font-weight: bold;
        }
        .signature {
            margin-top: 30px;
            font-style: italic;
            color: #777777;
        }
        .greeting {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #007bff; margin-top: 0; margin-bottom: 20px;">Claim Created</h1>

        <p class="greeting">Hi, ${claim.user.name ?? ''}</p>

        <p>Your claim has been created successfully!</p>

        <div class="claim-details">
            <p><span class="strong">Claim Number:</span> ${claim.id}</p>
            <p><span class="strong">Status:</span> ${claim.status}</p>
            <p><span class="strong">Description:</span> ${claim.description}</p>
            <p><span class="strong">Incident Date:</span> ${claim.incidentDate}</p>
            <p><span class="strong">Incident Location:</span> ${claim.incidentLocation ?? "Not provided"}</p>
            <p><span class="strong">Type:</span> ${claim.type}</p>
            <p><span class="strong">Reported Date:</span> ${claim.reportedDate}</p>
        </div>

        <p style="margin-top: 30px;">Thank you for using our service!</p>

        <p class="signature">Best regards,<br>Lwando Kasuba</p>
        <p style="font-size: 12px; color: #777777;">This is a system-generated email. Please do not reply.</p>
        <p style="font-size: 12px; color: #777777;">Date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
        <p style="font-size: 12px; color: #777777;">If you have any questions, please contact us.</p>
    </div>
</body>
</html>`,
    text: `Your claim has been created successfully! Claim Number: ${claim.id}`,
  }
}

export const claimStatusUpdatedEmail = (claim: Claim & { user: User }) => {
  const date = new Date();
  return {
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claim Status Updated</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #007bff;
            margin-top: 0;
        }
        p {
            margin-bottom: 16px;
        }
        .status-update {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            background-color: #ffffff;
        }
        .detail-item {
            margin-bottom: 8px;
        }
        .strong {
            font-weight: bold;
        }
        .new-status {
            font-weight: bold;
            color: #28a745; /* Example: Green for success */
        }
        .signature {
            margin-top: 30px;
            font-style: italic;
            color: #777777;
        }
        .greeting {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #007bff; margin-top: 0; margin-bottom: 20px;">Claim Status Updated</h1>

        <p class="greeting">Hi, ${claim.user.name ?? ''}</p>

        <p>We are pleased to inform you that the status of your claim has been updated.</p>

        <div class="status-update">
            <p><span class="strong">Claim Number:</span> ${claim.id}</p>
            <p><span class="strong">Claim Type:</span> ${claim.type}</p>
            <p><span class="strong">Current Status:</span> <span class="new-status">${claim.status}</span></p>
            </div>

        <p style="margin-top: 30px;">You can log in to your account to view more details about your claim.</p>
        <p>If you have any questions, please do not hesitate to contact us.</p>

        <p class="signature">Best regards,<br>Lwando Kasuba</p>
        <p style="font-size: 12px; color: #777777;">This is a system-generated email. Please do not reply.</p>
        <p style="font-size: 12px; color: #777777;">Date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
        <p style="font-size: 12px; color: #777777;">If you have any questions, please contact us.</p>
    </div>
</body>
</html>
`,
    text: `The status of your claim has been updated. Claim Number: ${claim.id} to ${claim.status}`,
  }
}