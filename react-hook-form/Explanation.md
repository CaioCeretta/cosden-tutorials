# React Hook Form Lesson

Unfortunately, there are some things in React that if we try to do it natively without any sort of third party library,
we are not going to have a such a good experience. One of such things is forms, if we try to build a form natively in react,
often times we will end up spending more time trying to prevent the default behavior rather than encouraging it.

In this lesson we are going to learn an alternative form of building forms in react, which is 'React Hook Form' and it's
a form library that makes easy for us to build complex and performant forms in react.

# Default way

Here in this example we have a component that renders a very simple form, with an e-mail and password state and an error
state which has the form "schema" with the email and password.

A handle submit, which will set the errors as the empty state (like the default) and will make a manual validation of the
fields.

A controlled form as we know, which we will keep track of the input values and change the state.

Above the submit button we are going to display the errors, in case there is one

# React hook form