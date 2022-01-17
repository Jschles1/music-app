import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text,
} from '@chakra-ui/react';
import ReactHowler from 'react-howler';
import { useEffect, useState, useRef } from 'react';
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const [seek, setSeek] = useState(0.0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0.0);
    const soundRef = useRef(null);

    const setPlayState = (value) => {
        setPlaying(value);
    };

    const onShuffle = () => {
        setShuffle((state) => !state);
    };

    const onRepeat = () => {
        setRepeat((state) => !state);
    };

    const prevSong = () => {
        setIndex((state) => (state ? state - 1 : songs.length - 1));
    };

    const nextSong = () => {
        setIndex((state: any) => {
            if (shuffle) {
                const next = Math.floor(Math.random() * songs.length);

                if (next === state) {
                    return nextSong();
                }

                return next;
            }
            return state === songs.length - 1 ? 0 : state + 1;
        });
    };

    const onEnd = () => {
        if (repeat) {
            setSeek(0);
            soundRef.current.seek(0);
        } else {
            nextSong();
        }
    }

    const onLoad = () => {
        const songDuration = soundRef.current.duration();
        setDuration(songDuration);
    }

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]));
        soundRef.current.seek(e[0])
    };

    return (
        <Box>
            <Box>
                <ReactHowler
                    playing={playing}
                    src={activeSong?.url}
                    ref={soundRef}
                    onLoad={onLoad}
                    onEnd={onEnd}
                />
            </Box>

            <Center color="gray.600">
                <ButtonGroup>
                    <IconButton
                        icon={<MdShuffle />}
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="24px"
                        color={shuffle ? 'white' : 'gray.600'}
                        onClick={onShuffle}
                    />

                    <IconButton
                        icon={<MdSkipPrevious />}
                        outline="none"
                        variant="link"
                        aria-label="skip"
                        fontSize="24px"
                        onClick={prevSong}
                    />

                    {playing ? (
                        <IconButton
                            icon={<MdOutlinePauseCircleFilled />}
                            outline="none"
                            variant="link"
                            aria-label="pause"
                            fontSize="40px"
                            color="white"
                            onClick={() => setPlayState(false)}
                        />
                    ) : (
                        <IconButton
                            icon={<MdOutlinePlayCircleFilled />}
                            outline="none"
                            variant="link"
                            aria-label="play"
                            fontSize="40px"
                            color="white"
                            onClick={() => setPlayState(true)}
                        />
                    )}

                    <IconButton
                        icon={<MdSkipNext />}
                        outline="none"
                        variant="link"
                        aria-label="skip"
                        fontSize="24px"
                        onClick={nextSong}
                    />

                    <IconButton
                        icon={<MdOutlineRepeat />}
                        outline="none"
                        variant="link"
                        aria-label="repeat"
                        fontSize="24px"
                        color={shuffle ? 'white' : 'gray.600'}
                        onClick={onRepeat}
                    />
                </ButtonGroup>
            </Center>

            <Box color="gray.600">
                <Flex justify="center" align="center">
                    <Box width="10%">
                        <Text fontSize="xs">1:21</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider
                            aria-label={['min', 'max']}
                            step={0.1}
                            min={0}
                            id="player-range"
                            max={duration ? (duration.toFixed(2) as any) : 0}
                            onChange={onSeek}
                            value={[seek]}
                            onChangeStart={() => setIsSeeking(true)}
                            onChangeEnd={() => setIsSeeking(false)}
                        >
                            <RangeSliderTrack bg="gray.800">
                                <RangeSliderFilledTrack bg="gray.600" />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right">
                        <Text fontSize="xs">3:21</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default Player;
