import {path} from "../../routes/Routes";

type PropsType = {
    id: string
    onClick?: () => void
    className?: string
}

export const SvgSelector = ({id, onClick, className}: PropsType) => {
    switch (id) {
        case 'Eye':
            return (
                <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24">
                    <path
                        d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/>
                </svg>
            )
        case 'ballLoader':
            return (
                <svg width="120" height="120" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg"
                     stroke="mediumblue">
                    <g fill="mediumblue" fillRule="evenodd">
                        <g transform="translate(1 1)" strokeWidth="2">
                            <circle cx="5" cy="50" r="5">
                                <animate attributeName="cy"
                                         begin="0s" dur="2.2s"
                                         values="50;5;50;50"
                                         calcMode="linear"
                                         repeatCount="indefinite"/>
                                <animate attributeName="cx"
                                         begin="0s" dur="2.2s"
                                         values="5;27;49;5"
                                         calcMode="linear"
                                         repeatCount="indefinite"/>
                            </circle>
                            <circle cx="27" cy="5" r="5">
                                <animate attributeName="cy"
                                         begin="0s" dur="2.2s"
                                         from="5" to="5"
                                         values="5;50;50;5"
                                         calcMode="linear"
                                         repeatCount="indefinite"/>
                                <animate attributeName="cx"
                                         begin="0s" dur="2.2s"
                                         from="27" to="27"
                                         values="27;49;5;27"
                                         calcMode="linear"
                                         repeatCount="indefinite"/>
                            </circle>
                            <circle cx="49" cy="50" r="5">
                                <animate attributeName="cy"
                                         begin="0s" dur="2.2s"
                                         values="50;50;5;50"
                                         calcMode="linear"
                                         repeatCount="indefinite"/>
                                <animate attributeName="cx"
                                         from="49" to="49"
                                         begin="0s" dur="2.2s"
                                         values="49;5;27;49"
                                         calcMode="linear"
                                         repeatCount="indefinite"/>
                            </circle>
                        </g>
                    </g>
                </svg>
            )
        case 'XIcon':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 122.87 122.87"
                    width="40" height="40"
                    fill="#ff2b2b"
                >
                    <path
                        d="M18 18A61.45 61.45 0 110 61.44 61.28 61.28 0 0118 18zm59.38 21l6.53 6.54a4 4 0 010 5.63L73.6 61.44l10.31 10.31a4 4 0 010 5.63l-6.53 6.53a4 4 0 01-5.63 0L61.44 73.6 51.13 83.91a4 4 0 01-5.63 0L39 77.38a4 4 0 010-5.63l10.28-10.31L39 51.13a4 4 0 010-5.63l6.5-6.5a4 4 0 015.63 0l10.31 10.28L71.75 39a4 4 0 015.63 0zM61.44 10.54a50.91 50.91 0 1036 14.91 50.83 50.83 0 00-36-14.91z"></path>
                </svg>
            )
        case 'search':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="grey"
                    viewBox="0 0 14 14"
                >
                    <path

                        fill="grey"
                        fillRule="evenodd"
                        d="M10.571 5.857a4.714 4.714 0 11-9.428 0 4.714 4.714 0 019.428 0zM9.53 10.236a5.714 5.714 0 11.707-.707l2.832 2.832a.5.5 0 01-.707.707l-2.832-2.832z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            )
        case 'down':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2" width="18"
                     height="18">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
            )
        case 'up':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2" width="18"
                     height="18">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
                </svg>
            )
        default:
            return <svg></svg>
    }
}