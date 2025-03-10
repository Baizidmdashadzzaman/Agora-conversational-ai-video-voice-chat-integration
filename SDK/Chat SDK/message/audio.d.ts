type ChatType = 'singleChat' | 'groupChat' | 'chatRoom';
export interface AudioParameters {
	/** The message type. */
	type: 'audio';
	/** The message ID. */
	id: string;
}
export interface FileObj {
	url: string;
	filename: string;
	filetype: string;
	data: File;
}

/** The delivery priority of chat room messages.
 *  Currently, this attribute is available only to chat room messages. If this attribute is not set, messages are assigned a medium priority. */
export type MessagePriority =
	/** High. */
	| 'high'
	/** Medium. */
	| 'normal'
	/** Low. */
	| 'low';

export interface AudioMsgSetParameters {
	/** The session type. */
	chatType: ChatType;
	/** The file object. */
	file: FileObj;
	/** The file name. */
	filename: string;
	/** The audio duration. */
	length?: number;
	/** The audio file length. */
	file_length?: number;
	/** The input ID of the file to be uploaded. */
	fileInputId?: string;
	/** The recipient. */
	to: string;
	/** The sender, which can only be the current user and can not be changed.*/
	from?: string;
	/** @deprecated Whether the session type is chat room. */
	roomType?: boolean;
	/** The callback for message sending success. */
	success?: () => void;
	/** The callback for a message sending failure. */
	fail?: () => void;
	/** The message extension. */
	ext?: {
		[key: string]: any;
	};
	/** File upload address. */
	apiUrl?: string;
	/** The callback of a file upload error. */
	onFileUploadError?: (err: any) => void;
	/** The callback of file upload completion. */
	onFileUploadComplete?: (data: any) => void;
	/** The callback of the file upload progress. */
	onFileUploadProgress?: (data: ProgressEvent) => void;
	/** The message body. */
	body?: {
		/** The file URL. */
		url: string;
		/** The file type. */
		type: string;
		/** The file name. */
		filename: string;
	};
	/** Whether the message is a thread message. */
	isChatThread?: boolean;
}
export interface AudioMsgBody extends AudioMsgSetParameters {
	/** The message ID. */
	id: string;
	/** The message type. */
	type: 'audio';
	/** Whether it's group chat. */
	group?: string;
	/** Whether read receipts are required during a group session. */
	msgConfig?: {
		allowGroupAck: boolean;
	};
	/** Time. */
	time: number;
	/** Whether the message is a thread message. */
	isChatThread?: boolean;
	/** Message priority. */
	priority?: MessagePriority;
	/** Whether global notify message or not. */
	broadcast?: boolean;
	/** Whether the message content is replaced. This property is valid only when `useReplacedMessageContent` is set to `true` during initialization. */
	isContentReplaced?: boolean;
	/** Whether the message is delivered only when the recipient(s) is/are online:
	 *  - `true`: The message is delivered only when the recipient(s) is/are online. If the recipient is offline, the message is discarded.
	 *  - (Default) `false`: The message is delivered when the recipient(s) is/are online. If the recipient(s) is/are offline, the message will not be delivered to them until they get online.
	 */
	deliverOnlineOnly?: boolean;
	/** The list of message recipients. */
	receiverList?: string[];
}
export interface CreateAudioMsgParameters {
	/** The message type. */
	type: 'audio';
	/** The session type. */
	chatType: ChatType;
	/** The file object. */
	file: FileObj;
	/** The file name. */
	filename: string;
	/** The audio duration. */
	length?: number;
	/** The audio file length. */
	file_length?: number;
	/** The input ID of the file to be uploaded. */
	fileInputId?: string;
	/** The recipient. */
	to: string;
	/** The sender, which can only be the current user and can not be changed.*/
	from?: string;
	/** The message extension. */
	ext?: {
		[key: string]: any;
	};
	/** The callback of a file upload error. */
	onFileUploadError?: (error: any) => void;
	/** The callback of file upload completion. */
	onFileUploadComplete?: (data: any) => void;
	/** The callback of the file upload progress. */
	onFileUploadProgress?: (data: any) => void;
	/** The message body. */
	body?: {
		/** The file URL. */
		url: string;
		/** The file type. */
		type: string;
		/** The file name. */
		filename: string;
	};
	/** Whether read receipts are required during a group session. */
	msgConfig?: {
		allowGroupAck: boolean;
	};
	/** Whether the message is a thread message. */
	isChatThread?: boolean;
	/** Message priority. */
	priority?: MessagePriority;
	/** Whether the message is delivered only when the recipient(s) is/are online:
	 *  - `true`: The message is delivered only when the recipient(s) is/are online. If the recipient is offline, the message is discarded.
	 *  - (Default) `false`: The message is delivered when the recipient(s) is/are online. If the recipient(s) is/are offline, the message will not be delivered to them until they get online.
	 */
	deliverOnlineOnly?: boolean;
	/** The list of message recipients. */
	receiverList?: string[];
}
export declare class Audio {
	id: string;
	type: 'audio';
	body?: AudioMsgBody;
	constructor(parameters: AudioParameters);
	/**
	 * @hidden
	 */
	set(options: AudioMsgSetParameters): void;
	/**
	 * @hidden
	 */
	setChatType(chatType: ChatType): boolean;
	/**
	 * @hidden
	 */
	setGroup(group: string): boolean;
	static create(options: CreateAudioMsgParameters): AudioMsgBody;
}
