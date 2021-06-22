import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('password_mismatch', confirmed);

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `This field ${ctx.field} is required`,
          min: `The field ${ctx.field} too short`,
          max: `The field ${ctx.field} too long`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          min_value: `The field ${ctx.field} too low`,
          max_value: `The field ${ctx.field} too high`,
          password_mismatch: "The paswords don't match",
          tos: 'You must accept the Terms of Service',
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `Field ${ctx.field} is an invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
