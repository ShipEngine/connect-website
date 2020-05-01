import inquirer, { Answers, QuestionCollection } from "inquirer";

/**
 * Request user input via the cli
 */
export async function cliPrompt(questions: QuestionCollection): Promise<Answers> {

  let answers;
  try {
    answers = await inquirer.prompt(questions);
  }
  catch (error) {
    const e = error as Error;
    throw e;
  }

  return answers;
}
