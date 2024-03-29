import { Button } from '@geist-ui/core';
import { GetServerSideProps } from 'next';
import { Layout } from '../../components/Layout';
import { getServerSideSession } from '../../service/session';

const Token = ({ redirectUrl = 'http://127.0.0.1:9789' }: { redirectUrl: string }) => (
  <div className="flex flex-col items-center">
    <div className="inline-flex justify-center items-center text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 ">
      Connect to Turbocache
    </div>
    <div className="mt-[70px]"></div>
    <div className="w-[480px] flex justify-center items-center">
      <Button
        shadow
        icon="🔑"
        type="secondary"
        onClick={() => {
          fetch('/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((v) => v.json())
            .then((v) => {
              window.location.href = `${redirectUrl}?token=${v.token}`;
            });
        }}
      >
        Authorize
      </Button>
    </div>
  </div>
);
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [result, redirect] = await getServerSideSession(context)
  if (redirect) {
    return redirect
  }
  return {
    props: {
      session: result.session,
    }
  }
}
Token.getLayout = Layout
export default Token;
