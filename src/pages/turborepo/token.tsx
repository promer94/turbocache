import { Nav } from '../../components/Nav';
import { Button } from '@geist-ui/core';
import { GetServerSideProps } from 'next';
import { getServerSideSession } from '../../service/session';

const Token = ({ redirectUrl = 'http://127.0.0.1:9789' }: { redirectUrl: string }) => (
  <div>
    <div className="h-full">
      <Nav></Nav>
      <div className="mt-[140px]"></div>
      <div className="max-w-[500px] m-auto flex flex-col items-center">
        <div className="text-[40px] inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 ">
          Connect to your Turborepo CLI
        </div>
        <div className="mt-[70px]"></div>
        <Button
          shadow
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
          className="width-[320px]"
        >
          🔐
        </Button>
      </div>
    </div>
  </div>
);
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [data, redirect] = await getServerSideSession(context);
  if (data) {
    return {
      props: {
        session: data.session,
      },
    };
  }
  return redirect;
};
export default Token;
