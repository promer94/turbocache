import { Card, Code } from "@geist-ui/core";
import CheckInCircle from "@geist-ui/icons/checkInCircle";
import { Layout } from "../components/Layout";

type SetupProps = {
  isS3Configured: boolean;
};
/**
 * TODO use mdx for article pages
 */
const Setup = ({ isS3Configured }: SetupProps) => {
  const isEverythingConfigured = isS3Configured;

  return (
    <div className="min-w-[500px]">
      <h1 className="text-[40px] inline-flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 mb-[16px]">
        Setup
      </h1>
      {isEverythingConfigured ? (
        <p>Great! Turbocache is fully enabled!</p>
      ) : (
        <p>Complete following setup steps to fully enable Turbocache.</p>
      )}
      <div className="mt-[32px]"></div>

      {isS3Configured ? (
        <Card>
          <h2 className="text-xl text-black font-medium">
            <CheckInCircle className="inline mr-1" /> Configure object storage
          </h2>
        </Card>
      ) : (
        <Card shadow>
          <h2 className="text-xl text-black font-medium mb-[16px]">
            Configure object storage
          </h2>

          <p>
            An S3-compatible object storage is required to store uploaded
            caches.
          </p>
          <p>
            Fulfill following environment variables and restart Turbocache
            server.
          </p>

          <Code block>
            AWS_ACCESSKEY_ID= <br />
            AWS_ACCESSKEY_TOKEN= <br />
            AWS_S3_BUCKET= <br />
            AWS_S3_REGION=
          </Code>
        </Card>
      )}
    </div>
  );
};

Setup.getLayout = Layout;

export default Setup;

export async function getServerSideProps() {
  const {
    AWS_ACCESSKEY_ID,
    AWS_ACCESSKEY_TOKEN,
    AWS_S3_BUCKET,
    AWS_S3_REGION,
  } = process.env;

  const isS3Configured =
    AWS_ACCESSKEY_ID && AWS_ACCESSKEY_TOKEN && AWS_S3_BUCKET && AWS_S3_REGION;

  return {
    props: {
      isS3Configured,
    },
  };
}
