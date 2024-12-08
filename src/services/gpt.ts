import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const functions = [
  {
    name: 'approve_transfer',
    description: 'Approve the transfer of funds from the treasury',
    parameters: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
          description: 'Amount to transfer from treasury',
        },
        reason: {
          type: 'string',
          description: 'Reason for approving the transfer',
        },
      },
      required: ['amount', 'reason'],
    },
  },
  {
    name: 'reject_transfer',
    description: 'Reject the transfer request',
    parameters: {
      type: 'object',
      properties: {
        reason: {
          type: 'string',
          description: 'Reason for rejecting the transfer',
        },
      },
      required: ['reason'],
    },
  },
];

export async function getAIResponse(
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  currentMessage: string
) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
      { role: 'user', content: currentMessage },
    ],
    functions,
    function_call: 'auto',
  });

  const response = completion.choices[0];
  
  if (response.finish_reason === 'function_call' && response.message.function_call) {
    const functionCall = response.message.function_call;
    
    if (functionCall.name === 'approve_transfer') {
      const args = JSON.parse(functionCall.arguments);
      return {
        content: `Transfer approved! Amount: $${args.amount}\nReason: ${args.reason}`,
        function: {
          name: functionCall.name,
          args,
        },
      };
    } else if (functionCall.name === 'reject_transfer') {
      const args = JSON.parse(functionCall.arguments);
      return {
        content: `Transfer rejected.\nReason: ${args.reason}`,
        function: {
          name: functionCall.name,
          args,
        },
      };
    }
  }

  return {
    content: response.message.content || 'No response generated',
    function: null,
  };
}