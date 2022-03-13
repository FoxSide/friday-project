
import {path} from "../../routes/Routes";

type PropsType = {
    id: string
    onClick?: ()=>void
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
                <svg width="100" height="100" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" stroke="mediumblue">
                    <g fill="mediumblue" fill-rule="evenodd">
                        <g transform="translate(1 1)" stroke-width="2">
                            <circle cx="5" cy="50" r="5">
                                <animate attributeName="cy"
                                         begin="0s" dur="2.2s"
                                         values="50;5;50;50"
                                         calcMode="linear"
                                         repeatCount="indefinite" />
                                <animate attributeName="cx"
                                         begin="0s" dur="2.2s"
                                         values="5;27;49;5"
                                         calcMode="linear"
                                         repeatCount="indefinite" />
                            </circle>
                            <circle cx="27" cy="5" r="5">
                                <animate attributeName="cy"
                                         begin="0s" dur="2.2s"
                                         from="5" to="5"
                                         values="5;50;50;5"
                                         calcMode="linear"
                                         repeatCount="indefinite" />
                                <animate attributeName="cx"
                                         begin="0s" dur="2.2s"
                                         from="27" to="27"
                                         values="27;49;5;27"
                                         calcMode="linear"
                                         repeatCount="indefinite" />
                            </circle>
                            <circle cx="49" cy="50" r="5">
                                <animate attributeName="cy"
                                         begin="0s" dur="2.2s"
                                         values="50;50;5;50"
                                         calcMode="linear"
                                         repeatCount="indefinite" />
                                <animate attributeName="cx"
                                         from="49" to="49"
                                         begin="0s" dur="2.2s"
                                         values="49;5;27;49"
                                         calcMode="linear"
                                         repeatCount="indefinite" />
                            </circle>
                        </g>
                    </g>
                </svg>
            )
        default:
            return <svg></svg>
    }
}