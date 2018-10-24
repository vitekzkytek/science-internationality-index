const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://ec2-18-188-88-0.us-east-2.compute.amazonaws.com:4466',
});
const queryCountries = `query GetCountries {
  countries {
    id, name,totdocs
  }
}
`;

const queryFields = `query GetFieldsOfLevel($level: String) {
  fields(where: { level: $level }) {
    id
    name
  }
}
`;

const queryMethods = `query GetMethods {
  methods {
    id
    name
  }
}
`;


const queryIndex = ` query GetIndex_CMF(
    $c: CountryWhereInput,
    $m: MethodWhereInput
    $f: FieldWhereInput
    ) {
    interindexes(where: { method_code: $m, country_code: $c, field_code: $f }) {
        #method_code {id},
            #country_code {id},
        period,
        value
    },
    countries(where: $c){
        id,
        region,
        wb_name,
        name,
        gdppc2017,
        iso2code
        pop2017,
        totdocs,
        lendingtype
    },
    fields(where:$f) {
        id,
        name,
        level,
        scopus_code,
        scopus_name
    },
    methods(where:$m) {
        id,
        minmax,
        name,
        full_name,
        short_desc,
        long_desc,
        formula
    }
    
    }`;

exports.queryInterindex = function (queryBody) {
    return  fetch({
        query: queryIndex,
        variables: {
            "c": {"id": queryBody['query[country_code]']},
            "m": {"id": queryBody['query[method_code]']},
            "f": {"id": queryBody['query[field_code]']}
        },
    })
};

exports.queryFields = function (queryBody) {
    return fetch({
        query:queryFields,
        variables: {
            "level": queryBody['query[level]']
        },
    })
};
exports.queryCountries = function (queryBody) {
    return fetch({
        query:queryCountries,
        variables: {

        },
    })
};
exports.queryMethods = function (queryBody) {
    return fetch({
        query:queryMethods,
        variables: {

        },
    })
};
