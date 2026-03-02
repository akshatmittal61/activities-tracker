import { enableEmailSender, googleEmailConfig } from "@/config";
import { AppSeo, emailTemplates, frontendBaseUrl } from "@/constants";
import { Logger } from "@/log";
import { EmailTemplateGenerator, T_EMAIL_TEMPLATE } from "@/types";
import { BooleanUtils } from "@/utils";
import { createTransport } from "nodemailer";
import { emailTemplate } from "./template";

export class EmailService {
	private static getSMTPTransport() {
		const transportOptions = {
			service: "gmail",
			auth: {
				user: googleEmailConfig.email,
				pass: googleEmailConfig.password,
			},
			// Built-in connection pooling and rate limiting
			pool: true, // Enable connection pooling
			maxConnections: 5, // Max concurrent connections
			maxMessages: 100, // Max messages per connection
			rateDelta: 1000, // Time window for rate limiting (1 second)
			rateLimit: 5, // Max messages per rateDelta period
		};
		return createTransport(transportOptions);
	}

	private static async send(to: string, subject: string, html: string) {
		if (BooleanUtils.False.equals(enableEmailSender)) {
			Logger.warn(`Email to ${to} blocked by flag: ${subject}`);
			return;
		}
		return EmailService.getSMTPTransport().sendMail({
			from: {
				name: AppSeo.title || "",
				address: googleEmailConfig.email,
			},
			to,
			subject,
			html,
		});
	}

	private static async bulkSend(
		to: Array<string>,
		subject: string,
		html: string
	) {
		if (BooleanUtils.False.equals(enableEmailSender)) {
			Logger.warn(
				`Email to ${to.join(", ")} blocked by flag: ${subject}`
			);
			return;
		}
		return EmailService.getSMTPTransport().sendMail({
			from: googleEmailConfig.email,
			bcc: to,
			subject,
			html,
		});
	}

	public static async sendByTemplate<T extends T_EMAIL_TEMPLATE>(
		to: string,
		subject: string,
		template: T,
		data: EmailTemplateGenerator<T>
	) {
		const html = EmailService.getEmailTemplate(template, data);
		return EmailService.send(to, subject, html);
	}

	public static async bulkSendByTemplate<T extends T_EMAIL_TEMPLATE>(
		to: Array<string>,
		subject: string,
		template: T,
		data: EmailTemplateGenerator<T>
	) {
		const html = EmailService.getEmailTemplate(template, data);
		return EmailService.bulkSend(to, subject, html);
	}

	private static getEmailTemplate<T extends T_EMAIL_TEMPLATE>(
		template: T,
		data: EmailTemplateGenerator<T>
	) {
		if (template === emailTemplates.OTP) {
			const payload = data as EmailTemplateGenerator<"OTP">;
			return emailTemplate(
				"OTP requested for Login",
				`Your OTP is ${payload.otp}`
			);
		} else if (template === emailTemplates.NEW_USER_ONBOARDED) {
			return emailTemplate(
				`Welcome to ${AppSeo.title}`,
				"Your account has been created successfully. You can now login to your account.",
				"Login",
				`${frontendBaseUrl}/login`
			);
		} else if (template === emailTemplates.CONTACT_MESSAGE) {
			const payload = data as EmailTemplateGenerator<"CONTACT_MESSAGE">;
			return emailTemplate(
				`You have unread message from ${payload.name}`,
				`${payload.message}`,
				`Click to reply to ${payload.name}`,
				`mailto:${payload.email}`
			);
		} else {
			return "";
		}
	}
}
