# Action ICT Interviews

React application used to realize interviews.

## Installation

```bash
# Clone the repository
git clone https://github.com/luizveronesi/react-interviews.git

# Navigate to the project directory
cd react-interviews

# Install dependencies
npm install

# Build
npm run build
```

## Usage

```bash
# Run the application for development
npm start
```

To use in your code, add the following import statement to each file and create a constant variable using the hook, which represents the function available to access texts.

## Generating questions

Go to: https://platform.openai.com/playground/chat

Add the following system prompt:

```bash
You are a software developer
You are creating questions for a technical interview
You are given a level: junior, middle, senior
You are given a theme
You are given the a number of questions
There are two types of questions: theoretical or code
The question and the answers must be given in english
You are given a language to output the translations (the question and the answers)
Half of the questions must be theoretical, half should have a code to be analyzed
All questions must have 4 answers
Output in json format with this structure:
[{
  question: string;
  answers: string[];
  correct: number; // correspond to the index of the array of answers
  code?: string; // if there is code to be analyzed
  translations: Record<string, string[]>; // key is the international code for the language

}]
```

Add the following user prompt (change the information as needed):

```bash
Theme: Cloud AWS
Level: junior
Translation: italian
Number of questions: 10
```

Add a new record for the theme in /files/index.json. The code attribute specifies the type of formatting used to display the code, if any.

```json
{ "id": 1, "name": "Cloud - AWS", "code": "json" }
```

Add files for each level (junior, middle, senior) in the 'files' folder using the following pattern:

```bash
theme-name-level.json
```

Replace any spaces in the theme name with hyphens.
