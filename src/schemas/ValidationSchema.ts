import * as yup from "yup";

export const PaymentSchema = yup.object().shape({
  fullName: yup.string().required("Your full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("Please enter the city"),
  zipCode: yup.number().required("Zip Code is required"),
  creditCardNumber: yup
    .string()
    .required("Credit card number is required")
    .matches(/^\d{16}$/, "Credit card number must be 16 digits"),
  expirationMonth: yup
    .number()
    .required("Expiration month is required")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  expirationYear: yup
    .number()
    .required("Expiration year is required")
    .min(
      new Date().getFullYear(),
      "Expiration year must be the current year or later"
    ),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
});
