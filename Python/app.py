from flask_cors import CORS
from flask import Flask
from flask import jsonify, make_response,request
from flask_cors import CORS
import pandas as pd
from sklearn.manifold import MDS
import json 
app = Flask(__name__)
CORS(app)
@app.route('/test',methods=['POST','GET'])
def test():
   if(request.is_json):
      req=request.get_json()
      df=pd.DataFrame.from_dict(req["data"])
      contribution_cols = [col for col in df.columns if '_contribution' in col]
      embedding = MDS(n_components=2)
      X_transformed = embedding.fit_transform(df[contribution_cols].to_numpy())
      print()
   response=make_response(jsonify({"response":json.dumps(X_transformed.tolist())}), 200)
   response.headers.add('Access-Control-Allow-Origin', '*')
   return response
#--------------------------------Main program starts here
if __name__ == '__main__':
   app.run(host='0.0.0.0')
   app.run(debug = True)
