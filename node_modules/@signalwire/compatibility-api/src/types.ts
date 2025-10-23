/**
 * Attributes to pass to AI
 *
 * @property engine - The Text-To-Speech engine to use. Default: "gcloud"
 * @property voice - Text-To-Speech voice to use. Default: "en-US-Neural2-J"
 * @property postPromptURL - SignalWire will make a POST request to this URL when the conversation terminates
 * @property postPromptAuthUser - HTTP user to use for the request to postPromptURL
 * @property postPromptAuthPassword - HTTP password to use for the request to postPromptURL
 * @property hints - A list of words and phrases that a caller is likely to say during a call
 */
export interface AIAttributes {
  engine?: string
  voice?: string
  postPromptURL?: string
  postPromptAuthUser?: string
  postPromptAuthPassword?: string
  hints?: string
}

/**
 * Attributes to pass to AI's prompt
 *
 * @property temperature - What statistical sampling temperature to use, between 0 and 2
 * @property topP - An alternative to sampling with temperature, called nucleus sampling
 * @property confidence - Confidence threshold, between 0 and 1, decreasing this value will reduce the pause after the user speaks
 * @property bargeConfidence - Confidence threshold, between 0 and 1, this only applies when the user is speaking over the AI agent
 * @property presencePenalty - Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far
 * @property frequencyPenalty - Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far
 */
export interface AIPromptAttributes {
  temperature?: number
  topP?: number
  confidence?: number
  bargeConfidence?: number
  presencePenalty?: number
  frequencyPenalty?: number
}

export interface AIPostPromptAttributes extends AIPromptAttributes {}

/**
 * Attributes to pass to Language noun
 *
 * @property code - Language code
 * @property name - Name of the language
 * @property voice - Voice to use for the language. The engine is the one specified in the <AI>'s engine attribute
 */
export interface LanguageAttributes {
  code?: string;
  name?: string;
  voice?: string;
}

/**
 * Attributes to pass to Defaults noun
 *
 * @property webHookURL - The webhook to invoke when a function is called
 * @property webHookAuthUser - Username for webHookURL. Ignored if a username is already provided in webHookURL
 * @property webHookAuthPass - Password for webHookURL. Ignored if a password is already provided in webHookURL
 */
export interface DefaultsAttributes {
  webHookURL?: string;
  webHookAuthUser?: string;
  webHookAuthPass?: string;
}

/**
 * Attributes to pass to Function noun
 *
 * @property name - A unique name for the function
 * @property argument - A description of the input to the function
 * @property purpose - A description of the context and purpose of the function, to explain the agent when to use it
 * @property webHookURL - The webhook to invoke when the function is called. Request parameters are sent to the webook
 * @property webHookAuthUser - Username for webHookURL. Ignored if a username is already provided in webHookURL
 * @property webHookAuthPass - Password for webHookURL. Ignored if a password is already provided in webHookURL
 */
export interface FunctionAttributes {
  name?: string;
  argument?: string;
  purpose?: string;
  webHookURL?: string;
  webHookAuthUser?: string;
  webHookAuthPass?: string;
}