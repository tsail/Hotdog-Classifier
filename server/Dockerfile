FROM ubuntu:18.04

ENV PYTHONUNBUFFERED TRUE

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y \
    fakeroot \
    ca-certificates \
    dpkg-dev \
    g++ \
    python3-dev \
    openjdk-11-jdk \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && cd /tmp \
    && curl -O https://bootstrap.pypa.io/get-pip.py \
    && python3 get-pip.py

RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN update-alternatives --install /usr/local/bin/pip pip /usr/local/bin/pip3 1

# We copy just the requirements.txt first to leverage Docker cache
COPY requirements.txt /
COPY server.py /
COPY model.pt /
COPY Procfile /
COPY runtime.txt /

RUN pip install -r requirements.txt
RUN pip install torch==1.5.0+cpu torchvision==0.6.0+cpu -f https://download.pytorch.org/whl/torch_stable.html

CMD gunicorn server:app --bind 0.0.0.0:$PORT --workers=2
