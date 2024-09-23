import { useFormik } from "formik";
import style from "./PaymentForm.module.css";
import { PaymentSchema } from "../../schemas/ValidationSchema";

const PaymentForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      creditCardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
    },
    validationSchema: PaymentSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className={style.form} onSubmit={formik.handleSubmit}>
      <div>
        <div className={style.headTitle}>BILLING ADDRESS</div>
        <div className={style.together}>
          <label className={style.label} htmlFor="fullName">
            Full Name
          </label>
          <input
            className={style.input}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className={style.error}>{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="email">
            Email
          </label>
          <input
            className={style.input}
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={style.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="address">
            Address
          </label>
          <input
            className={style.input}
            id="address"
            name="address"
            type="text"
            placeholder="123 Main St"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className={style.error}>{formik.errors.address}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="city">
            City
          </label>
          <input
            className={style.input}
            id="city"
            name="city"
            type="text"
            placeholder="City Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className={style.error}>{formik.errors.city}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="zipCode">
            Zip Code
          </label>
          <input
            className={style.input}
            id="zipCode"
            name="zipCode"
            type="text"
            placeholder="12345"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zipCode}
          />
          {formik.touched.zipCode && formik.errors.zipCode ? (
            <div className={style.error}>{formik.errors.zipCode}</div>
          ) : null}
        </div>
      </div>

      <div>
        <div className={style.headTitle}>PAYMENT</div>
        <div className={style.acceptedCards}>
          <p>Accepted cards:</p>
          <div className={style.cards}>
            <img src="/src/assets/visa.png" alt="Visa" />
            <img src="/src/assets/mastercard.png" alt="MasterCard" />
            <img src="/src/assets/bank.png" alt="American Express" />
          </div>
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="creditCardNumber">
            Credit Card Number
          </label>
          <input
            className={style.input}
            id="creditCardNumber"
            name="creditCardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.creditCardNumber}
          />
          {formik.touched.creditCardNumber && formik.errors.creditCardNumber ? (
            <div className={style.error}>{formik.errors.creditCardNumber}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="expirationMonth">
            Expiration Month
          </label>
          <input
            className={style.input}
            id="expirationMonth"
            name="expirationMonth"
            type="number"
            placeholder="MM"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expirationMonth}
          />
          {formik.touched.expirationMonth && formik.errors.expirationMonth ? (
            <div className={style.error}>{formik.errors.expirationMonth}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="expirationYear">
            Expiration Year
          </label>
          <input
            className={style.input}
            id="expirationYear"
            name="expirationYear"
            type="number"
            placeholder="YYYY"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expirationYear}
          />
          {formik.touched.expirationYear && formik.errors.expirationYear ? (
            <div className={style.error}>{formik.errors.expirationYear}</div>
          ) : null}
        </div>
        <div className={style.together}>
          <label className={style.label} htmlFor="cvv">
            CVV
          </label>
          <input
            className={style.input}
            id="cvv"
            name="cvv"
            type="text"
            placeholder="123"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cvv}
          />
          {formik.touched.cvv && formik.errors.cvv ? (
            <div className={style.error}>{formik.errors.cvv}</div>
          ) : null}
        </div>
      </div>

      <button className={style.button} type="submit">
        Purchase
      </button>
    </form>
  );
};

export default PaymentForm;
