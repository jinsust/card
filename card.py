import web
import re
import sys
import json
import datetime
import time
import urllib
import urllib2

urls = (
    '/index', 'index',
    '/templates/(.*)', 'proxy',
    '/', 'index'
)

web.config.debug = False

app = web.application(urls, globals())

class render_with_linebreak(object):
    def __getattr__(self, name):
        def _call(*args):
            r = getattr(web.template.render('templates'), name)(*args)
            r['__body__'] = r['__body__'].replace('\n', '\\\n')
            return r

        return _call

def get_globals():
    return {
        #'render': render_with_linebreak()
        
    }

class index:
    def GET(self):
        return self.enter()
        
    def POST(self):
        return self.enter()
        
    def enter(self):
        render = web.template.render('templates/',  base="base", globals=get_globals())
        
        return render.intro()

class proxy:
    def GET(self, method):
        render = web.template.frender("templates/"+method)

        return render()
    
class dashboardData:
    def GET(self):
        result = {'status': 'ok', 
                  'result':[
                            {'brandId': 2345, 'brandName': 'EA', 'brandRank': 1, 'brandPay': 12782.22, 'brandItems': 3900, 'brandPeoples': 333},
                            {'brandId': 2346, 'brandName': 'EB', 'brandRank': 2, 'brandPay': 3782.22, 'brandItems': 900, 'brandPeoples': 24},
                            {'brandId': 2347, 'brandName': 'EC', 'brandRank': 3, 'brandPay': 2782.22, 'brandItems': 300, 'brandPeoples': 21},
                            {'brandId': 2348, 'brandName': 'ED', 'brandRank': 4, 'brandPay': 782.22, 'brandItems': 39, 'brandPeoples': 15},
                            {'brandId': 2349, 'brandName': 'EF', 'brandRank': 5, 'brandPay': 82.22, 'brandItems': 9, 'brandPeoples': 8}
                        ]
                  }
        return json.dumps(result)

if __name__ == "__main__":
    #print sys.argv
    if 'debug' not in sys.argv:
        #pidfile.pid()
        web.wsgi.runwsgi = lambda func, addr=None: web.wsgi.runfcgi(func, addr)
    else:
        sys.argv.remove('debug')

    app.run()
    #pidfile.quitnormal()

