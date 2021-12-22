# Challenge 01 - React Concepts

![desafio1-ignite](https://user-images.githubusercontent.com/49786548/131220117-79d5ac8b-4cab-43b4-bccc-4acc7669df0d.gif)


## 💻 About the challenge

This will be an application where your main objective is a small application of activities to do, to train a little more about manipulating the state in React.

- Add a new task
- Remove a task
- Mark and unmark a task as completed

## 🚀 Technologies
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [React JS](https://pt-br.reactjs.org/)
- [Babel JS](https://babeljs.io/)
- [Webpack](https://webpack.js.org/)
- [SASS](https://sass-lang.com/)
- [Jest](https://jestjs.io/pt-BR/)

## 🧑‍🔬 Test specification

### TaskList.spec.tsx
- **should be able to add a task**
For this test to pass, you must allow the task to be created and, with that, displayed on screen. 
The taks created must contain the attributes following the interface standard, which is:

```ts
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}
```

- **should not be able to add a task with an empty title**
For this test to pass, before creating a new task, you must validate if something was typed in the input and not allow the task creation if the value is empty, 
if the typed value is empty, you must prevent the task creation.

- **should be able to remove a task**
For this test to pass, you must allow that when clicking on the button with a trash icon, 
the task related to that button is removed from the application state, consequently being removed from the screen.

- **should be able to check a task**
For this test to pass, you must allow that when clicking the checkbox next to the task, it is marked as completed or not completed according to its current state, 
changing its value of `isComplete` from `false` to `true` or conversely, from `true` to `false`.

To run the test run the command `yarn test` or `npm test`.

## 🧑‍💻 How to run the application

1- Clone this repository:
`git clone https://github.com/AndersonUfop/challenge01-reactjs-concepts`

2- Access the folder `challenge01-reactjs-concepts` and open it in Visual Studio Code:
```
cd challenge01-reactjs-concepts
code .
```
3- Install the dependencies by running the `yarn` or `npm install` command in the terminal.

4- To run the application run the command `yarn dev` or `npm run dev`.

5- Go to `http://localhost:8080`.

## 🤔 How to contribute

- Fork the repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Send to your branch: `git push origin my-feature`.
- After merging your pull request, you can delete your branch.

## 📄 License
This project is under license from MIT. See the [LICENSE](LICENSE) file for more details.

## 👤 Author

<img src="https://media-exp1.licdn.com/dms/image/C4D03AQHVutZ_d4BiZg/profile-displayphoto-shrink_100_100/0/1613236541927?e=1635379200&v=beta&t=u_rf1dZP7V2etKQVHwD4w1aWhqa8h617PVe7pUu1ckY">
<strong>Anderson Fernandes</strong>

___

Made with 💜 by Anderson Fernandes 👋🏽

Contact me!

[![Linkedin Badge](https://img.shields.io/badge/-Anderson-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/anderson-fernandes-8b5a50135/)](https://www.linkedin.com/in/anderson-fernandes-8b5a50135/)
[![Gmail Badge](https://img.shields.io/badge/-andersonfferreira96@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:andersonfferreira96@gmail.com)](mailto:andersonfferreira96@gmail.com)
