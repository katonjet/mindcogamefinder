
export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie;

  // Check if Laravel session cookie exists
  const hasSession = cookies?.includes('laravel_session');

  if (!hasSession) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}   