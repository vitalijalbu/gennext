import { validEmailRegExp, validUsPhoneRegExp } from "lib/forms";
import { getGrToken } from "lib/gr";
import { NextRouter, useRouter } from "next/router";
import { FC } from "react";
import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";
import { ContactFormData } from "types";
import styles from "./Form.module.scss";
import cn from "classnames";

const marqList = new Array(14).fill(0);

const Form: FC = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    mode: "onTouched"
  });
  const { isSubmitting, errors } = formState;
  const hasErrors = !!Object.keys(errors).length;

  return (
    <div className={styles.wrapper}>
      <div id="contactUs">
      <div className={styles.anchor} />
      <Marquee className={styles.marquee} gradient={false}>
        {marqList.map((_, id) => {
          return <p key={id}>contact us</p>;
        })}
      </Marquee>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit((data) => onSubmit(data, router))}>
          <div className={styles.leftCol}>
            <input
              placeholder="BORROWER NAME*"
              {...register("name", {
                required: true
              })}
              className={errors.name && styles.error}
            />
            <input
              placeholder="EMAIL*"
              {...register("email", {
                required: true,
                pattern: {
                  value: validEmailRegExp,
                  message: "Invalid Email Address Format"
                }
              })}
              className={errors.email && styles.error}
            />
            <input
              placeholder="PHONE NUMBER*"
              {...register("phone", {
                required: true,
                pattern: {
                  value: validUsPhoneRegExp,
                  message: "Invalid Phone Format"
                }
              })}
              className={errors.phone && styles.error}
            />
          </div>
          <div className={styles.rightCol}>
            <input
              placeholder="PROPERTY STATE*"
              {...register("state", {
                required: true
              })}
              className={errors.state && styles.error}
            />

            <textarea
              placeholder="QUESTIONS & COMMENTS"
              {...register("message")}
              className={errors.message && styles.error}
            />
          </div>

          <button
            className={cn(styles.submitBtn, {
              [styles.isSubmitting]: isSubmitting,
              [styles.hasErrors]: hasErrors
            })}
          >
            Send
          </button>
        </form>
      </div>

      <Marquee className={styles.marquee} direction="right" gradient={false}>
        {marqList.map((_, id) => {
          return <p key={id}>contact us</p>;
        })}
      </Marquee>
      </div>
    </div>
  );
};

export default Form;

const onSubmit = async (
  data: ContactFormData,
  router: NextRouter
): Promise<void> => {
  const token = await getGrToken("contact");

  const fetchData = await fetch("/api/forms/contact", {
    method: "POST",
    body: JSON.stringify({ ...data, token })
  });

  const json = await fetchData.json();

  if (!json.success) {
    alert("something went wrong, please try again later");
  } else {
    router.push("/thank-you");
  }
};
