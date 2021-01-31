from flask import current_app
from rdflib import URIRef
from rdflib.namespace import RDF, RDFS

get_subclass_by_superclass_query = '''
SELECT ?subclass ?label WHERE { 
    ?subclass rdfs:subClassOf+ ?superClass;
              rdfs:label ?label . 
}'''

get_uri_by_type_query = '''
SELECT ?uri ?label WHERE {
    ?uri rdf:type ?type ;
         rdfs:label ?label.
}
'''

ask_is_subclass_query = 'ASK { ?uri rdfs:subClassOf+ ?superClass }'


def get_subclasses_by_super_class(super_class: str):
    return current_app.store.query_assertions(get_subclass_by_superclass_query,
                                              initNs={'rdfs': RDFS},
                                              initBindings={'superClass': super_class})


def get_uri_by_type(type_: str):
    return current_app.store.query_assertions(get_uri_by_type_query,
                                              initNs={'rdf': RDF,
                                                      'rdfs': RDFS},
                                              initBindings={'type': type_})


def ask_is_subclass(uri: str, super_class: str):
    return current_app.store.query_assertions(ask_is_subclass_query,
                                              initNs={'rdfs': RDFS},
                                              initBindings={
                                                  'uri': URIRef(uri),
                                                  'superClass': URIRef(super_class)
                                              })
