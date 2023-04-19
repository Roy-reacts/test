import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  contactNumber: yup.string().required(),
  alternativeContactNumber: yup.string().required(),
});

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit the form data
      localStorage.setItem('formData', JSON.stringify(formData));
      setStep(4);
    }
  };

  const handlePrevClick = () => {
    setStep(step - 1);
  };

  const renderStepOne = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="text" name="email" ref={register} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" ref={register} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" ref={register} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" ref={register} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Next</button>
      </form>
    );
  };

  const renderStepTwo = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" ref={register} />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" ref={register} />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
        <div>
          <label>Contact Number</label>
          <input type="text" name="contactNumber" ref={register} />
          {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
        </div>
        <div>
          <label>
          Alternative Contact Number</label>
<input type="text" name="alternativeContactNumber" ref={register} />
{errors.alternativeContactNumber && <p>{errors.alternativeContactNumber.message}</p>}
</div>
<button type="button" onClick={handlePrevClick}>Previous</button>
<button type="submit">Next</button>
</form>
);
};
const renderStepThree = () => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Upload Your Photo</label>
        <input type="file" name="photo" ref={register} />
        {errors.photo && <p>{errors.photo.message}</p>}
      </div>
      <div>
        <label>Upload Your Signature</label>
        <input type="file" name="signature" ref={register} />
        {errors.signature && <p>{errors.signature.message}</p>}
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={handlePrevClick}>Previous</button>
    </form>
  );
};

const renderStepFour = () => {
  return (
    <div>
      <h2>Submission Completed</h2>
      <p>Here is your form data:</p>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

// const SignupPage = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({});
//   const { register, handleSubmit, errors } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     setFormData({ ...formData, ...data });

//     if (step < 3) {
//       setStep(step + 1);
//     } else {
//       // Submit the form data
//       localStorage.setItem('formData', JSON.stringify(formData));
//       setStep(4);
//     }
//   };

//   const handlePrevClick = () => {
//     setStep(step - 1);
//   };

  return (
    <div>
      <h1>Signup</h1>
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
      {step === 4 && renderStepFour()}
    </div>
  );
};

export default SignupPage;
