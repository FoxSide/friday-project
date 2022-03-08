import React from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/super-input-text/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/super-button/SuperButton";

const Registration = () => {
  return (
    <div>
        <div>
            <h2>It-incubator</h2>
            <h3>Sing Up</h3>
        </div>
        <div>
            <p>Email</p>
            <SuperInputText/>
            <p>Password</p>
            <SuperInputText/>
            <p>Confirm Password</p>
            <SuperInputText/>
        </div>
        <div>
            <SuperButton>Cancel</SuperButton>
            <SuperButton>Register</SuperButton>
        </div>

    </div>
  );
};

export default Registration;