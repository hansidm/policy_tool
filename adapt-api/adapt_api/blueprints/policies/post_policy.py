import json
from uuid import UUID

from flask import current_app, jsonify, request
from rdflib import Graph, plugin
from rdflib.serializer import Serializer
from twks.nanopub import Nanopublication

from ...common import graph_factory
from .policies_blueprint import policies_blueprint


@policies_blueprint.route('', methods=['POST'])
def post_policy():
    # retrieve policy data from request and log
    policy_data = request.json
    current_app.logger.info(json.dumps(policy_data))

    # parse the data as json-ld then serialize to ttl
    result = (graph_factory()
              .parse(data=json.dumps(policy_data), format='json-ld')
              .serialize(format='ttl')
              .decode('utf-8'))

    current_app.logger.info(result)

    # parse as nanopublication and put in twks
    pub = Nanopublication.parse_assertions(data=result, format="turtle")
    current_app.store.put_nanopublication(pub)

    # return nanopublication id as 'uuid'
    return jsonify({'uuid': UUID(pub.uri)})
