export const TextSVG = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 900 240"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <filter id="inner-shadow">
                    <feOffset dx="8" dy="8" />
                    <feGaussianBlur stdDeviation="4" result="offset-blur" />
                    <feComposite
                        operator="out"
                        in="SourceGraphic"
                        in2="offset-blur"
                        result="inverse"
                    />
                    <feFlood floodColor="black" floodOpacity="0.7" result="color" />
                    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>

                <filter
                    id="inset-shadow-v2"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feComponentTransfer in="SourceAlpha" result="inverted-alpha">
                        <feFuncA type="table" tableValues="1 0" />
                    </feComponentTransfer>

                    <feGaussianBlur in="inverted-alpha" stdDeviation="4" result="blur" />

                    <feOffset in="blur" dx="4" dy="4" result="offset-blur" />
                    <feFlood floodColor="black" floodOpacity="0.8" result="black-color" />
                    <feComposite
                        in="black-color"
                        in2="offset-blur"
                        operator="in"
                        result="dark-shadow-raw"
                    />
                    <feComposite
                        in="dark-shadow-raw"
                        in2="SourceAlpha"
                        operator="in"
                        result="dark-shadow-final"
                    />

                    <feOffset in="blur" dx="-4" dy="-4" result="offset-blur-light" />
                    <feFlood floodColor="white" floodOpacity="1" result="white-color" />
                    <feComposite
                        in="white-color"
                        in2="offset-blur-light"
                        operator="in"
                        result="light-shadow-raw"
                    />
                    <feComposite
                        in="light-shadow-raw"
                        in2="SourceAlpha"
                        operator="in"
                        result="light-shadow-final"
                    />

                    <feMerge>
                        <feMergeNode in="SourceGraphic" />
                        <feMergeNode in="dark-shadow-final" />
                        <feMergeNode in="light-shadow-final" />
                    </feMerge>
                </filter>
            </defs>

            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="sans-serif"
                fontWeight="900"
                fontSize="80"
                fill="#e5e5e5"
                className="fill-neutral-100 dark:fill-neutral-950"
                filter="url(#inset-shadow-v2)"
                style={{ letterSpacing: "-4px" }}
            >
                Heyy What's Up
            </text>
        </svg>
    )
}