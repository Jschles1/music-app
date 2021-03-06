import { Box } from '@chakra-ui/layout';
import GradientLayout from '../../components/GradientLayout';
import SongTable from '../../components/SongsTable';
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
            <SongTable songs={playlist.songs} />
        </GradientLayout>
    );
};

export const getServerSideProps = async ({ query, req }) => {
    let user;

    try {
        user = validateToken(req.cookies.ACCESS_TOKEN);
    } catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const [playlist] = await prisma.playlist.findMany({
        where: { id: +query.id, userId: user.id },
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
