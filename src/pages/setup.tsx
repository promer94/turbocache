import { Code } from "@geist-ui/core";
import { Layout } from "../components/Layout";

/**
 * TODO use mdx for article pages
 */
const Setup = () => {
  return (
    <div>
      <h1 className="text-[40px] inline-flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 mt-[16px]">
        Setup
      </h1>
      <p>Complete following setup steps to fully enable Turbocache.</p>
      <div className="mt-[32px]"></div>

      <h2 className="text-xl text-black font-medium mt-[16px]">
        Configure object storage
      </h2>

      <p>
        An S3-compatible object storage is required to store uploaded caches.
      </p>
      <p>
        Fulfill following environment variables and restart Turbocache server.
      </p>

      <Code block>
        AWS_ACCESSKEY_ID= <br />
        AWS_ACCESSKEY_TOKEN= <br />
        AWS_S3_BUCKET= <br />
        AWS_S3_REGION=
      </Code>
    </div>
  );
};

Setup.getLayout = Layout;

export default Setup;
