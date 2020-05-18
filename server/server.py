from flask import Flask
from flask import request
from flask_cors import CORS
from flask import jsonify

import torch
from torchvision import transforms, models
from torch.autograd import Variable

from PIL import Image
import requests
import io

label_map = {0: 'Hotdog',
             1: 'Not Hotdog'}

TRANSFORM_IMG = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

print('Initializing model...')
model = torch.hub.load('pytorch/vision', 'mobilenet_v2')

model.classifier = torch.nn.Sequential(
    torch.nn.Dropout(p=0.2, inplace=False),
    torch.nn.Linear(in_features=1280, out_features=2),
)

print('Loading model state dict...')
model_state_dict = torch.load('./model.pt', map_location='cpu')
model.load_state_dict(model_state_dict)

print('Setting model to eval mode...')
model.eval()
for params in model.parameters():
    params.requires_grad = False

application = Flask(__name__)
CORS(application)

@application.route('/', methods = ['POST'])
def classify_img():
    data = request.get_json()
    img_url = data['url']
    response = requests.get(img_url)
    img = Image.open(io.BytesIO(response.content))
    img_tensor = TRANSFORM_IMG(img)
    img_tensor.unsqueeze_(0)
    img_variable = Variable(img_tensor)
    output = model(img_variable)
    return jsonify({'classification': label_map[output.argmax().item()]})

if __name__ == '__main__':
    application.run(port=5000, threaded=True, host='0.0.0.0')
