import { Box } from '@chakra-ui/layout';
import GradientLayout from '../components/GradientLayout';
import prisma from '../lib/prisma';

const Home = ({ artists }) => {
    return (
        <GradientLayout
            roundImage
            color="green"
            subtitle="Profile"
            title="John Schlesinger"
            description="15 public playlists"
            image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
        >
            <Box>hello</Box>
        </GradientLayout>
    );
};

export const getServerSideProps = async () => {
    const artists = await prisma.artist.findMany({});
    return {
        props: { artists },
    };
};

export default Home;
