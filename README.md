# lyricGPT (pre-alpha)

Using OpenAI's embeddings to search music

<img width="1413" alt="website" src="https://user-images.githubusercontent.com/51415676/230618869-8ef3f1cc-b468-402b-8f9e-094edc119af1.png">


## Tutorial

I wrote a tutorial about getting supabase set up and calling OpenAI's API. You can find it [here](tutorial.lyricgpt.io).

## running the app

```bash
pnpm i
pnpm run dev
```

## running generateEmbeddings

Move the `generateEmbeddings` folder to `app/api` and run the following commands:

```bash
pnpm run dev
```

Use curl to call endpoint

```bash
curl http://127.0.0.1:3001/api/generateEmbeddings
```

## Contributing to lyricGPT

To contribute to our project, follow these steps:

Fork the repository
Clone the repository to your local machine
Make changes to the code or documentation
Commit your changes
Push your changes to your forked repository
Open a pull request with a description of your changes
We welcome your contributions!
