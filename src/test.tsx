import React from "react";
import {useQuery} from "@apollo/client";

import "./App.css";
import Film from "./Film";
import {graphql} from "../src/gql";

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
    {
        properties(search: "Sweet info", filter: {rooms: {min: 4}}) {
            data {
                title
                content
            }
        }
    }
`);

function App() {
    // `data` is typed!
    const {data} = useQuery(allFilmsWithVariablesQueryDocument, {
        variables: {first: 10},
    });
    return (
        <div className="App">
            {data && (
                <ul>
                    {data.allFilms?.edges?.map(
                        (e, i) =>
                            e?.node && <Film film={e?.node} key={`film-${i}`} />
                    )}
                </ul>
            )}
        </div>
    );
}

export default App;
