import Photo from "../assets/About.jpg";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      {" "}
      <Header />
      <section class="bg-gray-900">
        <div class="mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24 lg:pb-32 pt-10">
          <h2 class="mb-8 text-3xl font-bold md:text-5xl lg:mb-14 text-blue-600">
            Meet FileXfer
          </h2>
          <p class="mb-8 max-w-lg text-sm text-white sm:text-base lg:mb-24">
            We take your data privacy seriously. FileXfer uses industry-leading
            security measures to protect your files. We are committed to
            maintaining the privacy and security of your data. We are GDPR
            compliant and have strict internal policies to ensure your data is
            safe with us.
          </p>
          <div class="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <img
              src={Photo}
              alt=""
              class="inline-block h-full w-full rounded-2xl object-cover"
            />
            <div class="flex flex-col gap-5 rounded-2xl border border-solid border-white p-10 sm:p-20">
              <h2 class="text-3xl font-bold md:text-5xl text-blue-600">
                Our Mission
              </h2>
              <p class="text-sm text-white sm:text-base">
                {" "}
                Our mission is to provide a secure and reliable file transfer
                service that is easy to use and accessible to everyone. We
                believe that data privacy is a fundamental human right and we
                are committed to ensuring that your data is safe and secure.
                <br />
                <br />
                We are constantly working to improve our service and provide you
                with the best possible experience. We are committed to
                maintaining the privacy and security of your data. We are GDPR
                compliant and have strict internal policies to ensure your data
                is safe with us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
