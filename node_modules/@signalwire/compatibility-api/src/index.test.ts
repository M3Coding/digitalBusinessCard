import twilio, { Twilio } from '../lib'
import { RestClient } from '../'

describe('It generate LaML', () => {
  const FROM = '+11111111119'

  it('should generate LaML', () => {
    const response = new RestClient.LaML.VoiceResponse()
    response.dial({ callerId: FROM }, '+11111111111')
    expect(response.toString()).toEqual(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Dial callerId="${FROM}">+11111111111</Dial></Response>`
    )
  })

  it('LaML to receive a fax', () => {
    const response = new RestClient.LaML.FaxResponse()
    response.receive({ action: '/receive/fax' })
    expect(response.toString()).toEqual(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Receive action="/receive/fax"/></Response>'
    )
  })

  it('LaML to reject a fax', () => {
    const response = new RestClient.LaML.FaxResponse()
    response.reject()
    expect(response.toString()).toEqual(
      '<?xml version="1.0" encoding="UTF-8"?><Response><Reject/></Response>'
    )
  })

  describe('<AI> noun', () => {
    it('should generate AI with attributes', () => {
      const response = new RestClient.LaML.VoiceResponse()
      const connect = response.connect()
      const ai = connect.ai({ voice: 'en-US-Neural2-J' })
      ai.setEngine('gcloud')

      expect(response.toString()).toEqual(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><AI voice="en-US-Neural2-J" engine="gcloud"/></Connect></Response>`
      )
    })

    it('should generate AI Prompt and PostPrompt verbs', () => {
      const response = new RestClient.LaML.VoiceResponse()
      const connect = response.connect()
      const ai = connect.ai()
      const prompt = ai.prompt('prompt1')
      prompt.setTemperature(0.2)
      ai.postPrompt({ topP: 0.5 }, 'prompt2')

      expect(response.toString()).toEqual(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><AI><Prompt temperature="0.2">prompt1</Prompt><PostPrompt topP="0.5">prompt2</PostPrompt></AI></Connect></Response>`
      )
    })

    it('should generate AI Languages verbs', () => {
      const response = new RestClient.LaML.VoiceResponse()
      const connect = response.connect()
      const ai = connect.ai()
      const languages = ai.languages()
      const language = languages.language({ name: 'English' })
      language.setCode('en-US')

      expect(response.toString()).toEqual(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><AI><Languages><Language name="English" code="en-US"/></Languages></AI></Connect></Response>`
      )
    })

    it('should generate <SWAIG> with Defaults and metadata', () => {
      const response = new RestClient.LaML.VoiceResponse()
      const connect = response.connect()
      const ai = connect.ai()
      const swaig = ai.swaig()
      const defaults = swaig.defaults({ webHookURL: 'https://example.com/commands.cgi' })
      defaults.setWebHookAuthUser('Default user')
      defaults.addMetaData('metaVar1', 'value1')

      expect(response.toString()).toEqual(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><AI><SWAIG><Defaults webHookURL="https://example.com/commands.cgi" webHookAuthUser="Default user"><metaVar1>value1</metaVar1></Defaults></SWAIG></AI></Connect></Response>`
      )
    })

    it('should generate <SWAIG> with Function and metadata', () => {
      const response = new RestClient.LaML.VoiceResponse()
      const connect = response.connect()
      const ai = connect.ai()
      const swaig = ai.swaig()
      const func = swaig.function({ name: 'get_weather' })
      func.setArgument('Function argument')
      func.addMetaData('metaVar1', 'value1')
      func.addMetaData('metaVar2', 'value2')

      expect(response.toString()).toEqual(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Connect><AI><SWAIG><Function name="get_weather" argument="Function argument"><metaVar1>value1</metaVar1><metaVar2>value2</metaVar2></Function></SWAIG></AI></Connect></Response>`
      )
    })
  })
})

describe('It is constructable', () => {
  const client = twilio('AC', 'token', {})
  const twilioProperties = Object.getOwnPropertyDescriptors(
    Object.getPrototypeOf(client)
  )

  it('should expose all the properties', () => {
    const client = RestClient('a', 'b', {
      signalwireSpaceUrl: 'example.domain.com',
    })
    Object.keys(twilioProperties).forEach((prop) => {
      expect(client[prop as keyof typeof Twilio]).toBeDefined()
    })
  })

  it('should read the spaceUrl from SIGNALWIRE_SPACE_URL variable', () => {
    process.env.SIGNALWIRE_SPACE_URL = 'example.domain.com'

    const client = RestClient('a', 'b')
    Object.keys(twilioProperties).forEach((prop) => {
      expect(client[prop as keyof typeof Twilio]).toBeDefined()
    })

    delete process.env.SIGNALWIRE_SPACE_URL
  })

  it('should read the spaceUrl from SIGNALWIRE_API_HOSTNAME variable', () => {
    process.env.SIGNALWIRE_API_HOSTNAME = 'example.domain.com'

    const client = RestClient('a', 'b')
    Object.keys(twilioProperties).forEach((prop) => {
      expect(client[prop as keyof typeof Twilio]).toBeDefined()
    })

    delete process.env.SIGNALWIRE_API_HOSTNAME
  })
})
