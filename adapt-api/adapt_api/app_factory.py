import json

import rdflib

from .app import App
from .config import get_config
from .store import get_store


def default_json_encoder(self, o):
    try:
        s = str(o)
    except TypeError:
        pass
    else:
        return s
    return json.JSONEncoder.default(self, o)


def index():
    return 'Hello there!'


def app_factory(name):
    app = App(name)
    config = get_config()
    app.config.from_object(config)

    store = get_store(app.config['KNOWLEDGE_STORE_HOST'],
                      app.config['KNOWLEDGE_STORE_PORT'])

    app.register_store(store)

    from .blueprints import blueprint_list
    for bp in blueprint_list:
        app.register_blueprint(bp)

    app.add_url_rule('/', '.index', index)

    return app
