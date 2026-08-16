---
slug: measurement-uncertainty
code: M2-02
level: 2
module: 距離梯子の最初の段
title: 測定誤差と推定
titleEn: Measurement Uncertainty and Estimation
summary: 測定値のばらつき、平均の精度、誤差伝播、逆分散重みを導出し、観測結果をどの桁まで主張できるか判断します。
duration: 70
outcomes:
  - 標準偏差、標準誤差、系統誤差を区別できる
  - 一変数および独立な多変数の一次誤差伝播を適用できる
  - 不確かさの異なる測定を逆分散重みで統合できる
  - S/Nと選択条件が推定結果へ与える影響を説明できる
prerequisites:
  - 年周視差から距離を測る
glossaryIds:
  - uncertainty
  - random-error
  - systematic-error
  - signal-to-noise
  - data
  - model
  - parallax
  - standard-deviation
  - standard-error
  - variance
  - error-propagation
  - weighted-mean
  - significant-figures
  - selection-effect
  - covariance
  - likelihood
  - prior
  - inference
claims:
  - status: Established
    text: 独立で小さな測定不確かさは、関数の偏微分を用いた一次近似で伝播できる。
  - status: Established
    text: 系統誤差は独立なランダム誤差と異なり、標本数を増やすだけでは一般に消えない。
sources:
  - title: NIST/SEMATECH e-Handbook of Statistical Methods — Uncertainty Analysis
    url: https://www.itl.nist.gov/div898/handbook/mpc/section5/mpc5.htm
    publisher: National Institute of Standards and Technology
    accessed: "2026-08-15"
  - title: Joint Committee for Guides in Metrology — Guide to the Expression of Uncertainty in Measurement
    url: https://www.bipm.org/en/committees/jc/jcgm/publications
    publisher: Bureau International des Poids et Mesures
    accessed: "2026-08-15"
  - title: Gaia Help and Data Release Documentation
    url: https://www.cosmos.esa.int/web/gaia-users/archive
    publisher: European Space Agency
    accessed: "2026-08-15"
lastReviewed: "2026-08-16"
---

## この章の合格条件

この章を修了した学習者は、「測定値 ± 不確かさ」を飾りではなく計算に使えます。

1. 標準偏差と平均の標準誤差を、対象の違いから説明する。
2. $d=1000/p$ の不確かさを微分から導く。
3. 精度の異なる二つの測定を逆分散重みで統合する。
4. 標本数を増やしても系統誤差が消えない例を示す。

本文末の修了判定では80%以上が必要です。

## このLevelで求める理解

- **Required Now:** 標準偏差・標準誤差・系統誤差を区別し、一次誤差伝播と逆分散重みを計算する。
- **Preview Only:** 非ガウス分布、相関行列を使う一般式、ベイズ推論、階層モデル。
- **Returns In:** 距離指標はL2-05〜06、S/Nと検出限界はL2-22〜23、統計推論はLevel 5〜7で再利用する。

## Layer 1：直感

同じ天体を繰り返し測ると、結果は完全には一致しません。光子数のゆらぎ、背景光、装置読み出し、観測条件が変わるからです。

ばらつきがあることは、測定が無意味という意味ではありません。どれくらいばらつくかを数量化し、その範囲で結論を述べます。

一方、温度計が常に0.5度高く表示するような偏りは、繰り返し平均しても残ります。これがランダムなばらつきと系統的な偏りの基本的な違いです。

## Layer 2：大学入門

$N$ 個の測定値 $x_i$ の算術平均は

$$
\bar{x}=\frac{1}{N}\sum_{i=1}^{N}x_i
$$

です。標本標準偏差は

$$
s=\sqrt{\frac{1}{N-1}\sum_{i=1}^{N}(x_i-\bar{x})^2}
$$

で、個々の測定がどれくらい散らばるかを表します。

独立で同じ分布から得た測定なら、平均の標準誤差は

$$
\mathrm{SE}(\bar{x})=\frac{s}{\sqrt{N}}
$$

です。$s$ は個々の値の散らばり、SEは平均値の推定精度です。同じものではありません。

## Layer 3：大学天文学

観測解析では、測定モデルと尤度を明示します。単純な例として、

$$
x_i=\mu+\epsilon_i,\qquad
\epsilon_i\sim\mathcal{N}(0,\sigma_i^2)
$$

を考えます。各測定が独立で、分散 $\sigma_i^2$ が既知なら、尤度を最大にする $\mu$ は逆分散重み付き平均になります。

$$
\hat{\mu}
=\frac{\sum_i x_i/\sigma_i^2}
{\sum_i1/\sigma_i^2}
$$

推定値の不確かさは

$$
\sigma_{\hat{\mu}}
=\left(\sum_i\frac{1}{\sigma_i^2}\right)^{-1/2}
$$

です。ただし、共通のzero pointや測定間の相関があるなら「独立」という仮定が崩れます。その場合は共分散行列を使います。

## ランダム誤差と系統誤差

**ランダム誤差**は、同じ条件で繰り返しても方向と大きさが変わる成分です。独立なら、多数の測定を平均することで平均への寄与が減ります。

**系統誤差**は、校正、モデル仮定、選択効果などにより特定方向へ偏らせる成分です。全測定が同じ偏りを共有するなら、数を増やしても残ります。

実際には両者を完全に分けられないこともあります。「統計誤差」と「系統誤差」を何としてモデル化したかを報告する必要があります。

## 一変数の誤差伝播

測定量 $x$ から

$$
y=f(x)
$$

を計算するとします。$x$ が平均値 $x_0$ の近くで小さく変動するなら、Taylor展開の一次までを使って

$$
f(x)\simeq f(x_0)
+\left.\frac{\mathrm{d}f}{\mathrm{d}x}\right|_{x_0}(x-x_0)
$$

です。したがって、

$$
\sigma_y
\simeq
\left|\frac{\mathrm{d}f}{\mathrm{d}x}\right|\sigma_x
$$

を得ます。

視差距離 $d=1000/p$ では

$$
\frac{\mathrm{d}d}{\mathrm{d}p}=-\frac{1000}{p^2}
$$

なので、

$$
\sigma_d\simeq\frac{1000}{p^2}\sigma_p
$$

です。両辺を $d=1000/p$ で割ると、

$$
\frac{\sigma_d}{d}\simeq\frac{\sigma_p}{p}
$$

となります。

## 多変数の誤差伝播

$y=f(x_1,x_2,\ldots)$ で、各変数の不確かさが小さく、互いに独立なら、

$$
\sigma_y^2
\simeq
\sum_i
\left(\frac{\partial f}{\partial x_i}\right)^2
\sigma_{x_i}^2
$$

です。

変数間に相関がある場合は共分散項が加わります。二変数なら、

$$
\sigma_y^2
\simeq
\left(\frac{\partial f}{\partial x}\right)^2\sigma_x^2
+\left(\frac{\partial f}{\partial z}\right)^2\sigma_z^2
+2\frac{\partial f}{\partial x}
\frac{\partial f}{\partial z}\mathrm{Cov}(x,z)
$$

です。共分散を無視してよいかは、データ生成過程から判断します。

## 例題1：積の相対不確かさ

小角近似

$$
D=d\theta
$$

で、$d$ と $\theta$ が独立とします。偏微分は

$$
\frac{\partial D}{\partial d}=\theta,\qquad
\frac{\partial D}{\partial\theta}=d
$$

です。したがって、

$$
\sigma_D^2
\simeq\theta^2\sigma_d^2+d^2\sigma_\theta^2
$$

$D^2=d^2\theta^2$ で割ると、

$$
\left(\frac{\sigma_D}{D}\right)^2
\simeq
\left(\frac{\sigma_d}{d}\right)^2
+\left(\frac{\sigma_\theta}{\theta}\right)^2
$$

を得ます。

## 例題2：逆分散重み

同じ量を二つの装置で測り、

$$
x_1=10.0\pm1.0,\qquad
x_2=14.0\pm2.0
$$

を得たとします。重みは

$$
w_1=\frac{1}{1.0^2}=1,\qquad
w_2=\frac{1}{2.0^2}=0.25
$$

です。したがって、

$$
\hat{\mu}
=\frac{1\times10.0+0.25\times14.0}{1+0.25}
=10.8
$$

です。単純平均12.0より、精度の高い第1測定へ近い結果になります。

不確かさは

$$
\sigma_{\hat{\mu}}
=\frac{1}{\sqrt{1+0.25}}
\simeq0.89
$$

です。

## S/Nをどう使うか

信号 $S$ とノイズの代表値 $N$ に対して

$$
\mathrm{S/N}=\frac{S}{N}
$$

とします。視差なら $p/\sigma_p$、フラックスなら測定フラックスをその不確かさで割る形がよく使われます。

S/Nは品質指標ですが、それだけでデータの正しさを保証しません。高S/Nでも校正が偏っていれば高精度に誤った値を得ます。また、S/Nで標本を切ると選択効果が生じます。

## 有効数字と報告

不確かさを通常1〜2桁で示し、測定値は同じ桁まで丸めます。

たとえば計算機が

$$
d=25.000000\ \mathrm{pc},\qquad
\sigma_d=1.250000\ \mathrm{pc}
$$

を返しても、入力が $40.0\pm2.0\ \mathrm{mas}$ なら、

$$
d=25.0\pm1.3\ \mathrm{pc}
$$

程度の報告が妥当です。丸め規則は分野や表の目的に合わせて明示します。

## 近似が破綻する条件

一次誤差伝播は、関数が測定範囲でほぼ直線と見なせるときに有効です。次の場合は注意が必要です。

- 相対不確かさが大きい。
- $1/p$ のように特異点が近い。
- 物理量に0以上などの境界がある。
- 誤差分布が強く非対称である。
- 測定間に無視できない相関がある。

この場合は、Monte Carloで測定分布を変換するか、尤度から求めたい量を直接推定します。

## 選択効果

「視差が正の天体だけ」「S/Nが10以上だけ」を残すと、選択条件そのものが標本分布を変えます。

品質カットが悪いのではありません。どの母集団について結論を述べたいかを定め、カットにより何が落ちたかを調べる必要があります。

観測可能性と母集団推定を結ぶ考え方は、銀河サーベイ、系外惑星、重力波源の解析でも共通します。

## 独力演習

1. $p=20.0\pm1.0\ \mathrm{mas}$ のS/N、距離、距離の近似不確かさを求めてください。
2. $x_1=10\pm1$ と $x_2=14\pm2$ の逆分散重み付き平均を再計算してください。
3. 距離が1%、角直径が2%の精度なら、実直径の相対不確かさを求めてください。
4. 100個の測定すべてに同じ $+0.3$ の校正偏差があるとき、平均で偏差が消えない理由を説明してください。
5. 低S/Nの視差をMonte Carloで距離へ変換するとき、負または0に近い視差試行をどう扱うべきか考えてください。

## 演習解答

1. S/Nは20。$d=50.0\ \mathrm{pc}$、$\sigma_d\simeq1000\times1.0/20.0^2=2.5\ \mathrm{pc}$。
2. 重みは1と0.25なので、$\hat{\mu}=10.8$。
3. $\sqrt{0.01^2+0.02^2}=0.0224$、約2.2%。
4. 共通偏差は独立な符号のばらつきではなく、全測定を同じ方向へ動かすためです。
5. 単純に逆数へ変換すると発散や非物理値が生じます。視差空間で尤度を定義し、距離の事前分布と組み合わせる方法が必要です。

## 修了後にできること

このモジュールを修了すると、カタログの「値 ± 誤差」を見て、次を判断できます。

- 単純な変換式が使える精度か。
- どの不確かさが結果を支配するか。
- 平均で減る成分と残る成分は何か。
- 品質カットが標本をどう変えるか。

次の定量モジュールでは、フラックス、光度、等級を扱い、逆二乗則から天体の固有の明るさを推定します。

## 次の章とのつながり

次の「標準光源と標準物差し」では、ここで学んだ不確かさを保ちながら、視差で直接届かない距離へ測定の目盛りをつなぎます。
