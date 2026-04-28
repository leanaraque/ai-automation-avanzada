# LLaMA: Open and Efficient Foundation Language Models

**Hugo Touvron\*, Thibaut Lavril\*, Gautier Izacard\*, Xavier Martinet**
**Marie-Anne Lachaux, Timothee Lacroix, Baptiste Rozière, Naman Goyal**
**Eric Hambro, Faisal Azhar, Aurelien Rodriguez, Armand Joulin**
**Edouard Grave\*, Guillaume Lample\***

Meta AI

## Abstract

We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens, and show that it is possible to train state-of-the-art models using publicly available datasets exclusively, without resorting to proprietary and inaccessible datasets. In particular, LLaMA-13B outperforms GPT-3 (175B) on most benchmarks, and LLaMA-65B is competitive with the best models, Chinchilla-70B and PaLM-540B. We release all our models to the research community¹.

performance, a smaller one trained longer will ultimately be cheaper at inference. For instance, although Hoffmann et al. (2022) recommends training a 10B model on 200B tokens, we find that the performance of a 7B model continues to improve even after 1T tokens.

## 1 Introduction

Large Languages Models (LLMs) trained on massive corpora of texts have shown their ability to perform new tasks from textual instructions or from a few examples (Brown et al., 2020). These few-shot properties first appeared when scaling models to a sufficient size (Kaplan et al., 2020), resulting in a line of work that focuses on further scaling these models (Chowdhery et al., 2022; Rae et al., 2021). These efforts are based on the assumption that more parameters will lead to better performance. However, recent work from Hoffmann et al. (2022) shows that, for a given compute budget, the best performances are not achieved by the largest models, but by smaller models trained on more data.

The objective of the scaling laws from Hoffmann et al. (2022) is to determine how to best scale the dataset and model sizes for a particular training compute budget. However, this objective disregards the *inference* budget, which becomes critical when serving a language model at scale. In this context, given a target level of performance, the preferred model is not the fastest to train but the fastest at inference, and although it may be cheaper to train a large model to reach a certain level of

The focus of this work is to train a series of language models that achieve the best possible performance at various inference budgets, by training on more tokens than what is typically used. The resulting models, called *LLaMA*, ranges from 7B to 65B parameters with competitive performance compared to the best existing LLMs. For instance, LLaMA-13B outperforms GPT-3 on most benchmarks, despite being 10× smaller. We believe that this model will help democratize the access and study of LLMs, since it can be run on a single GPU. At the higher-end of the scale, our 65B-parameter model is also competitive with the best large language models such as Chinchilla or PaLM-540B.

Unlike Chinchilla, PaLM, or GPT-3, we only use publicly available data, making our work compatible with open-sourcing, while most existing models rely on data which is either not publicly available or undocumented (e.g. "Books – 2TB" or "Social media conversations"). There exist some exceptions, notably OPT (Zhang et al., 2022), GPT-NeoX (Black et al., 2022), BLOOM (Scao et al., 2022) and GLM (Zeng et al., 2022), but none that are competitive with PaLM-62B or Chinchilla.

In the rest of this paper, we present an overview of the modifications we made to the transformer architecture (Vaswani et al., 2017), as well as our training method. We then report the performance of our models and compare with others LLMs on a set of standard benchmarks. Finally, we expose some of the biases and toxicity encoded in our models, using some of the most recent benchmarks from the responsible AI community.

\* Equal contribution. Correspondence: {htouvron, thibautlav, gizacard, egrave, glample}@meta.com
¹https://github.com/facebookresearch/llama

# 2 Approach

Our training approach is similar to the methods described in previous work (Brown et al., 2020; Chowdhery et al., 2022), and is inspired by the Chinchilla scaling laws (Hoffmann et al., 2022). We train large transformers on a large quantity of textual data using a standard optimizer.

## 2.1 Pre-training Data

Our training dataset is a mixture of several sources, reported in Table 1, that cover a diverse set of domains. For the most part, we reuse data sources that have been leveraged to train other LLMs, with the restriction of only using data that is publicly available, and compatible with open sourcing. This leads to the following mixture of data and the percentage they represent in the training set:


<table>
  <thead>
    <tr>
        <th>Dataset</th>
        <th>Sampling prop.</th>
        <th>Epochs</th>
        <th>Disk size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>CommonCrawl</td>
        <td>67.0%</td>
        <td>1.10</td>
        <td>3.3 TB</td>
    </tr>
    <tr>
        <td>C4</td>
        <td>15.0%</td>
        <td>1.06</td>
        <td>783 GB</td>
    </tr>
    <tr>
        <td>Github</td>
        <td>4.5%</td>
        <td>0.64</td>
        <td>328 GB</td>
    </tr>
    <tr>
        <td>Wikipedia</td>
        <td>4.5%</td>
        <td>2.45</td>
        <td>83 GB</td>
    </tr>
    <tr>
        <td>Books</td>
        <td>4.5%</td>
        <td>2.23</td>
        <td>85 GB</td>
    </tr>
    <tr>
        <td>ArXiv</td>
        <td>2.5%</td>
        <td>1.06</td>
        <td>92 GB</td>
    </tr>
    <tr>
        <td>StackExchange</td>
        <td>2.0%</td>
        <td>1.03</td>
        <td>78 GB</td>
    </tr>
  </tbody>
</table>


Table 1: **Pre-training data.** Data mixtures used for pre-training, for each subset we list the sampling proportion, number of epochs performed on the subset when training on 1.4T tokens, and disk size. The pre-training runs on 1T tokens have the same sampling proportion.

**English CommonCrawl [67%].** We preprocess five CommonCrawl dumps, ranging from 2017 to 2020, with the CCNet pipeline (Wenzek et al., 2020). This process deduplicates the data at the line level, performs language identification with a fastText linear classifier to remove non-English pages and filters low quality content with an n-gram language model. In addition, we trained a linear model to classify pages used as references in Wikipedia v.s. randomly sampled pages, and discarded pages not classified as references.

**C4 [15%].** During exploratory experiments, we observed that using diverse pre-processed CommonCrawl datasets improves performance. We thus included the publicly available C4 dataset (Raffel et al., 2020) in our data. The preprocessing of C4 also contains deduplication and language identification steps: the main difference with CCNet is the quality filtering, which mostly relies on heuristics such as presence of punctuation marks or the number of words and sentences in a webpage.

**Github [4.5%].** We use the public GitHub dataset available on Google BigQuery. We only kept projects that are distributed under the Apache, BSD and MIT licenses. Additionally, we filtered low quality files with heuristics based on the line length or proportion of alphanumeric characters, and removed boilerplate, such as headers, with regular expressions. Finally, we deduplicate the resulting dataset at the file level, with exact matches.

**Wikipedia [4.5%].** We add Wikipedia dumps from the June-August 2022 period, covering 20 languages, which use either the Latin or Cyrillic scripts: bg, ca, cs, da, de, en, es, fr, hr, hu, it, nl, pl, pt, ro, ru, sl, sr, sv, uk. We process the data to remove hyperlinks, comments and other formatting boilerplate.

**Gutenberg and Books3 [4.5%].** We include two book corpora in our training dataset: the Gutenberg Project, which contains books that are in the public domain, and the Books3 section of ThePile (Gao et al., 2020), a publicly available dataset for training large language models. We perform deduplication at the book level, removing books with more than 90% content overlap.

**ArXiv [2.5%].** We process arXiv Latex files to add scientific data to our dataset. Following Lewkowycz et al. (2022), we removed everything before the first section, as well as the bibliography. We also removed the comments from the .tex files, and inline-expanded definitions and macros written by users to increase consistency across papers.

**Stack Exchange [2%].** We include a dump of Stack Exchange, a website of high quality questions and answers that covers a diverse set of domains, ranging from computer science to chemistry. We kept the data from the 28 largest websites, removed the HTML tags from text and sorted the answers by score (from highest to lowest).

**Tokenizer.** We tokenize the data with the byte-pair encoding (BPE) algorithm (Sennrich et al., 2015), using the implementation from SentencePiece (Kudo and Richardson, 2018). Notably, we split all numbers into individual digits, and fallback to bytes to decompose unknown UTF-8 characters.

<table>
  <thead>
    <tr>
        <th>params</th>
        <th>dimension</th>
        <th>n heads</th>
        <th>n layers</th>
        <th>learning rate</th>
        <th>batch size</th>
        <th>n tokens</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>6.7B</td>
        <td>4096</td>
        <td>32</td>
        <td>32</td>
        <td>3.0e⁻⁴</td>
        <td>4M</td>
        <td>1.0T</td>
    </tr>
    <tr>
        <td>13.0B</td>
        <td>5120</td>
        <td>40</td>
        <td>40</td>
        <td>3.0e⁻⁴</td>
        <td>4M</td>
        <td>1.0T</td>
    </tr>
    <tr>
        <td>32.5B</td>
        <td>6656</td>
        <td>52</td>
        <td>60</td>
        <td>1.5e⁻⁴</td>
        <td>4M</td>
        <td>1.4T</td>
    </tr>
    <tr>
        <td>65.2B</td>
        <td>8192</td>
        <td>64</td>
        <td>80</td>
        <td>1.5e⁻⁴</td>
        <td>4M</td>
        <td>1.4T</td>
    </tr>
  </tbody>
</table>


Table 2: Model sizes, architectures, and optimization hyper-parameters.

Overall, our entire training dataset contains roughly 1.4T tokens after tokenization. For most of our training data, each token is used only once during training, with the exception of the Wikipedia and Books domains, over which we perform approximately two epochs.


<table>
  <tbody>
    <tr>
        <td>Billion of tokens</td>
        <td>LLaMA 7B</td>
        <td>LLaMA 13B</td>
        <td>LLaMA 33B</td>
        <td>LLaMA 65B</td>
    </tr>
    <tr>
        <td>0</td>
        <td>2.2</td>
        <td>2.2</td>
        <td>2.2</td>
        <td>2.2</td>
    </tr>
    <tr>
        <td>200</td>
        <td>1.95</td>
        <td>1.88</td>
        <td>1.82</td>
        <td>1.78</td>
    </tr>
    <tr>
        <td>400</td>
        <td>1.90</td>
        <td>1.82</td>
        <td>1.76</td>
        <td>1.72</td>
    </tr>
    <tr>
        <td>600</td>
        <td>1.86</td>
        <td>1.79</td>
        <td>1.73</td>
        <td>1.68</td>
    </tr>
    <tr>
        <td>800</td>
        <td>1.83</td>
        <td>1.76</td>
        <td>1.70</td>
        <td>1.64</td>
    </tr>
    <tr>
        <td>1000</td>
        <td>1.81</td>
        <td>1.73</td>
        <td>1.67</td>
        <td>1.61</td>
    </tr>
    <tr>
        <td>1200</td>
        <td> </td>
        <td> </td>
        <td>1.65</td>
        <td>1.59</td>
    </tr>
    <tr>
        <td>1400</td>
        <td> </td>
        <td> </td>
        <td>1.63</td>
        <td>1.57</td>
    </tr>
  </tbody>
</table>


Figure 1: Training loss over train tokens for the 7B, 13B, 33B, and 65 models. LLaMA-33B and LLaMA-65B were trained on 1.4T tokens. The smaller models were trained on 1.0T tokens. All models are trained with a batch size of 4M tokens.

## 2.2 Architecture

Following recent work on large language models, our network is based on the transformer architecture (Vaswani et al., 2017). We leverage various improvements that were subsequently proposed, and used in different models such as PaLM. Here are the main difference with the original architecture, and where we were found the inspiration for this change (in bracket):

**Pre-normalization [GPT3].** To improve the training stability, we normalize the input of each transformer sub-layer, instead of normalizing the output. We use the RMSNorm normalizing function, introduced by Zhang and Sennrich (2019).

**SwiGLU activation function [PaLM].** We replace the ReLU non-linearity by the SwiGLU activation function, introduced by Shazeer (2020) to improve the performance. We use a dimension of $\frac{2}{3}4d$ instead of $4d$ as in PaLM.

**Rotary Embeddings [GPTNeo].** We remove the absolute positional embeddings, and instead, add rotary positional embeddings (RoPE), introduced by Su et al. (2021), at each layer of the network.

The details of the hyper-parameters for our different models are given in Table 2.

## 2.3 Optimizer

Our models are trained using the AdamW optimizer (Loshchilov and Hutter, 2017), with the following hyper-parameters: $\beta_1 = 0.9, \beta_2 = 0.95$. We use a cosine learning rate schedule, such that the final learning rate is equal to 10% of the maximal learning rate. We use a weight decay of 0.1 and gradient clipping of 1.0. We use 2,000 warmup steps, and vary the learning rate and batch size with the size of the model (see Table 2 for details).

## 2.4 Efficient implementation

We make several optimizations to improve the training speed of our models. First, we use an efficient implementation of the causal multi-head attention operator, inspired by Rabe and Staats (2021) and Dao et al. (2022). This implementation, available in the xformers library,<sup>2</sup> reduces the memory usage and computation. This is achieved by not storing the attention weights and not computing the key/query scores that are masked due to the causal nature of the language modeling task.

To further improve training efficiency, we reduced the amount of activations that are recomputed during the backward pass with checkpointing. More precisely, we save the activations that are expensive to compute, such as the outputs of linear layers. This is achieved by manually implementing the backward function for the transformer layers, instead of relying on the PyTorch autograd. To fully benefit from this optimization, we need to

<sup>2</sup>https://github.com/facebookresearch/xformers
