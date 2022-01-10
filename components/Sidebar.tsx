import NextImage from 'next/image';
import NextLink from 'next/link';
import {
    Box,
    List,
    ListItem,
    ListIcon,
    Divider,
    Center,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/layout';
import {
    MdHome,
    MdSearch,
    MdLibraryMusic,
    MdPlaylistAdd,
    MdFavorite,
} from 'react-icons/md';
import { usePlaylist } from '../lib/hooks';

// TODO: Create sidebar menu group component

const navMenu = [
    {
        name: 'Home',
        icon: MdHome,
        route: '/',
    },
    {
        name: 'Search',
        icon: MdSearch,
        route: '/search',
    },
    {
        name: 'Your Library',
        icon: MdLibraryMusic,
        route: '/library',
    },
];

const musicMenu = [
    {
        name: 'Create Playlist',
        icon: MdPlaylistAdd,
        route: '/',
    },
    {
        name: 'Favorites',
        icon: MdFavorite,
        route: '/favorites',
    },
];

const Sidebar = () => {
    const { playlists, isLoading, isError } = usePlaylist();

    return (
        <Box
            width="100%"
            height="calc(100vh - 100px)"
            bg="black"
            paddingX="5px"
            color="gray"
        >
            <Box paddingY="20px" height="100%">
                <Box width="120px" marginBottom="20px" paddingX="20px">
                    <NextImage src="/logo.svg" height={60} width={120} />
                </Box>

                <Box marginBottom="20px">
                    <List spacing={2}>
                        {navMenu.map((item) => (
                            <ListItem
                                paddingX="20px"
                                fontSize="16px"
                                key={item.name}
                            >
                                <LinkBox>
                                    <NextLink href={item.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon
                                                as={item.icon}
                                                color="white"
                                                marginRight="20px"
                                            />
                                            {item.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box marginBottom="20px">
                    <List spacing={2}>
                        {musicMenu.map((item) => (
                            <ListItem
                                paddingX="20px"
                                fontSize="16px"
                                key={item.name}
                            >
                                <LinkBox>
                                    <NextLink href={item.route} passHref>
                                        <LinkOverlay>
                                            <ListIcon
                                                as={item.icon}
                                                color="white"
                                                marginRight="20px"
                                            />
                                            {item.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Divider color="gray.800" />

                {/* May need to adjust height for smaller screen heights */}
                <Box height="79%" overflowY="auto" paddingY="20px">
                    <List spacing={2}>
                        {playlists.map((playlist) => (
                            <ListItem key={playlist.id} paddingX="20px">
                                <LinkBox>
                                    <NextLink
                                        href={{
                                            pathname: '/playlist/[id]',
                                            query: { id: playlist.id },
                                        }}
                                        passHref
                                    >
                                        <LinkOverlay>
                                            {playlist.name}
                                        </LinkOverlay>
                                    </NextLink>
                                </LinkBox>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
