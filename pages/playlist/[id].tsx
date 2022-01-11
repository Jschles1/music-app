import { Box } from '@chakra-ui/layout';
import GradientLayout from '../../components/GradientLayout';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

const getBackgroundColor = (id) => {
    const colors = ['red', 'green', 'blue', 'orange', 'gray', 'purple'];

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
    const color = getBackgroundColor(playlist.id);
    return (
        <GradientLayout
            color={color}
            roundImage={false}
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            image={`https://picsum.photos/400?random=${playlist.id}`}
        >
            <Box></Box>
        </GradientLayout>
    );
};

export const getServerSideProps = async ({ query, req }) => {
    const { id } = validateToken(req.cookie.ACCESS_TOKEN);
    const [playlist] = await prisma.playlist.findMany({
        where: { id: +query.id, userId: id },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });

    return {
        props: {
            playlist,
        },
    };
};

export default Playlist;
