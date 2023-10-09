const grId = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const getGrToken = (action: string): Promise<string | null> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && grId) {
      try {
        grecaptcha.ready(() => {
          grecaptcha.execute(grId, { action }).then((token) => {
            resolve(token);
          });
        });
      } catch (err) {
        console.error(err);
        resolve(null);
      }
    } else {
      console.warn(
        "either there is no recaptcha site id set as node env for NEXT_PUBLIC_RECAPTCHA_SITE_KEY, or this is being run on the server"
      );
      resolve(null);
    }
  });
};
