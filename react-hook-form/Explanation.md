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

Above the submit button we are going to display the errors, in case there is one.

In simple cases like this, it's not even recommmended to do something like using react hook form, it will be an overkill

So for simple forms like these, with only two inputs, doing like this would be completely fine

But the problem on this, is that it don't scale at all, as soons as we want to add any sort of complexity to it, even
just adding more fields this will start to get very complicated very quickly. For every new field that we want to add,
we would a new state property, manage that field updates, then pass it to the actual input, so we would add another input
as well, add another onChange property, and if we have a form with 10 inputs, we can quickly see how much code we would
have to write just to get that working.

Also, every new field we add, we need to remember to add it to the error object, add it to the submit function to make sure
it will reset properly and we should handle our own validation... Even worse, let's say that instead of console logging
that the form is submitted, we actually want to take the data ,send it to the server and await the server response.

Now we'll need to turn this function into an async one, and if we do that, we probably want to show something to the user
as this form is being submitted, so we would display some UI to show that something is happening, also, we want to prevent
this button from being clicked while this form is submitting to prevent the form from being submitted multiple times. Now
we would create our own loading state and make sure we are properly handling that state inside of the submit handler by
setting it to true before it submits, and set it to false after we get a response back from the back-end.

And we can see that this is becoming very complicated, and we have to write a lot of code just for the form to work.

That is why we want to use a form library such as the react hook form, because it allows us to do all of this and more with
a lot less code and much better development experience

# React hook form

Using the form made in the old way as base, we will remove everything, the onChange, the errors, the handleSubmit, and the
state, now we have a basic simple form without any functionality.

to create a form with react-hook-form we are going to make use of the useForm custom hook, which we will import from
react-hook-form, and inside our component we are going to write.

type FormFields = {
  email: string;
  password: string;
}

const form = useForm<FormFields>()

whenever we work with anything form related in rhf, we are always going to have this properly typed.
The next step for us to do, is to actually connect the form element and the inputs to the rhf, because just by writing
that useForm<FormFields> is not enough. We actually have to connect all of the inputs and html elements for them to be
able to work with the form.
The way that we do this is by making use of the register function, also returned by useForm(), so we are going to destru-
cture the register from the useForm, so now it will be

const { register } = useForm<FormFields>()

now we will register the input with rhf, which we'll do by

<input
        type="password"
        placeholder="Password"
        {...register('password')}
      />

this is the syntax because, register('input-name') returns several attributes like onChange, onBlur, ref and name that
are needed to the form to manage its state
by using the spread operator {...register('password')}, we automatically pass all those properties to the input element
allowing rhf to control that field

## Break down of the { ...register('') }
a little breakdown

register('password') will return to us an object, that object contain various properties like the ones mentioned above,
these properties are essential for rhf to track all these properties.

The spread operator is spreading all those object propertgies, so js will take the object and expand its key-value pairs
into another object.
When we use {...register('password')} is the same as saying

<input
  type="password"
  placeholder="Password"
  onChange={register('password').onChange}
  onBlur={register('password').onBlur}
  name={register('password').name}
  ref={register('password').ref}
/>

react will take those properties and assign them as props to the input element.

different from when we destructure the object, like

const { register, handleSubmit } = useForm()

it's common to think of destructuring as pulling out constants or values directly, but in this case, we are pulling out
functions that still need to be invoked to get the relevant attributes.

## end of breakdown

so now both input fields have been registered to the form.

So now, whenever we type into these input fields, the value is going to get sent to rhf, and it will manage everything for
us, instead of us having to do all the job.

Now, we need to connect the onSubmit, so when the form is submitted, it calls our own submit function instead of submitting
it to the default behavior, which is to send it to an actual URL

so first we define ur own custom submit function, for example

const onSubmit: SubmitHandler<FormFields> = (data) => {
  console.log(data)
}

by typing this function as SubmitHandler<FormFields>, is actually making the parameter data be properly typed and we'll
see it has the type of FormFields, which is our type object. So the data we are receiving, from the function, is not
actually what we had previously in the first example. But it's actually just an object with the email and the password
and their corresponding values.

The reason why we're not getting the form event directly is because, we're not actually going to be passing this onSubmit
function to the form, actually, we are going to make use of the handleSubmit function, returned by useState
(e.g. const {register, handleSubmit } = useForm<FormFields>())

and give our onSubmit as an argument to this handleSubmit, so it would be

<form onSubmit={handleSubmit(onSubmit)} className="tutorial gap-2">

what this is going to do, is that whenever this form gets submitted it will first call the handleSubmit function from
rhf, and it will do some work behind the scenes for us, for example, it will prevent the default behavior of the form
and it will also going to make sure that our form fields are valid before then calling our onSubmit function with the
actual form fields, so it doesn't give us the form event, it actually just does all of the work of validating the inputs
for us. And then, once this work is done and when they are valid, it calls the function with the actual form fields.

Great, our form works exactly as expected, but we still have more work to do, if we submit this form without putting an
@ on the email or the password having less than 8 characters, it won't argue.

So to add validation to these fields, and making sure we have at least some validation before submitting our form. There
are multiple ways for us to validate inputs, first, we'll talk about the simplest one

## Types of validation

1. Simplest one

By using the register function, we pass an optional second parameter to it, which is an object for that specific field,
let's use the e-mail for this example

<input
  {...register('email', {
    required: true
  })}
  type="text"
  placeholder="Email"
>

on the object we give to it some properties to define how this field gets validated, such as required, minLength, maxLength,
regex pattern, etc.

Now, by leaving the inputs blank, we can no longer submit the form, the default behavior will be to focus on the required
input field.

we can also pass a function to make our own custom validation, like

validate: (value) =>  value.includes('@')

the function argument is going to be the respective input value.

The form is better, it's validating, but we're not showing anything to the user if the form is invalid, just the default focus
on the input. Ideally we would like to display an error if the input field is invalid.

1. Using the errors from formState, e.g. const { formState: {errors }} = useForm()

If we hover over this, we will see that errors is of type FieldErrors<FormFields>, so this will be an object, with all our
inputs and a corresponding error to them, if there is.

Then, we can actually use this by coming back to our jsx and right below the inputs, we can display those errors, like

{errors.email && (
        <div>
          <p className="text-red-500">{errors.email.message}</p>
        </div>
      )}

but if we submit the form, we are not going to see anything,  some space between the fields show up, but no text.

If we actually look at our code, we do have this div and paragraph that is being rendered to us, so the {errors.email} is
true, because otherwise the div wouldn't render, but the message is not being rendered. By hovering over it, we'll see that
the message is an optional property.

The thing is we have set our errors correctly in the sense that rhf is actually handling our errors with our validation, but
we haven't actually defined any message for a specific error, so it is undefined.

To fix that, we have to implement error messages for when our validation is incorrect.

" required: 'E-mail is required',
validate: (value) => {
  if(!value.includes('@')) {
    return 'E-mail input must include @ '
  }
  return true;
}

we simply remove the boolean and change it for our message and for the validate which is a function, we use an if in the
place of the boolean and returns the message, leaving the if scope, we need to return true because in the case where the
input is valid we still have to return a boolean. Only when it's invalid we can return a string, and the string will be
used as the error message.

in the case of the password length, it would be

minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }

and the input errors are going to be dynamic, for example
only the email is required will show at first, but as soon as we type something that is not a @, it would change the message
dynamically.

Great, now we have proper validation in our form, but now we are going to take this one step further and we'll use something
rhf makes really easy to do.

Let's say we want to convert this submit function to an asynchronous function, so instead of just console.logging the data
we actually want to await something, maybe sending it to a server and only once the response is returned, we then want to
continue, and also, we would want to show to the user that the form is being submitted. We should also, disable this button,
while the form is being submitted.

we'll just use this for the example: await new Promise((resolve) => setTimeout(resolve, 1000))

rhf, makes handling async functions really simple. We would extract isSubmitting, from the formState, this property is a
boolean that will be true if the form is submitting, so we wouldn't have to manage loading state or handle anything, now
we can simply use the disabled attribute from the button with this variable

<button disabled={isSubmitting} type="submit">
  {
    isSubmitting ? "Loading..." : 'Submit'
  }
</button>





 








