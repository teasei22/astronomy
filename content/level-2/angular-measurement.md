---
slug: angular-measurement
code: M2-01
level: 2
module: 空の位置・時刻・距離
title: 角度で宇宙を測る
titleEn: Angular Measurement and the Small-Angle Approximation
summary: 度・ラジアン・秒角を変換し、小角近似を幾何から導出して、見かけの角度を天体の大きさへ結びつけます。
duration: 50
outcomes:
  - 度、ラジアン、秒角、ミリ秒角を相互変換できる
  - 弧長の定義から小角近似 s = dθ を導出できる
  - 角直径と距離から天体の実直径を単位つきで計算できる
  - 小角近似が使える条件と観測分解能の制約を説明できる
prerequisites:
  - 宇宙の住所をたどる
glossaryIds:
  - data
  - uncertainty
  - telescope
  - parsec
claims:
  - status: Established
    text: ラジアンで表した十分小さい角度では、弧長は距離と角度の積で近似できる。
  - status: Established
    text: 天文学の角度測定は、装置の点像分布、校正、信号対雑音比による制限を受ける。
sources:
  - title: University Physics Volume 1 — Rotation Angle and Angular Velocity
    url: https://openstax.org/books/university-physics-volume-1/pages/10-1-rotational-variables
    publisher: OpenStax
    accessed: "2026-08-15"
  - title: Gaia — Mapping the stars of the Milky Way
    url: https://www.esa.int/Science_Exploration/Space_Science/Gaia/Mapping_the_stars_of_the_Milky_Way
    publisher: European Space Agency
    accessed: "2026-08-15"
lastReviewed: "2026-08-15"
---

## この章の合格条件

読み終えるだけでは修了になりません。次の三つを、資料を見ずに実行できることを目標にします。

1. $0.25^\circ$ を秒角へ変換する。
2. 小角近似 $s \simeq d\theta$ を、ラジアンの定義から説明する。
3. 距離と角直径を与えられた天体の実直径を、単位を保って計算する。

本文末の修了判定では、選択問題と数値問題の両方で80%以上が必要です。

## 前提確認

比、三角比、10のべき、単位換算を使います。次を確認してください。

- $1\ \mathrm{km}=10^3\ \mathrm{m}$
- 円周は $2\pi r$
- 直角三角形で $\tan\theta=$ 対辺 / 隣辺

三角関数の細かな公式は暗記不要です。必要な関係はこの章で導きます。

## Layer 1：直感

天体は遠すぎるため、定規を直接当てられません。そこで最初に測るのは「空でどれだけの幅に見えるか」という**角度**です。

同じ直径の物体でも、遠ざかるほど小さな角度に見えます。逆に、見かけの角度が同じでも、遠い物体ほど実際には大きいはずです。

この関係を数量化するのが小角近似です。

## Layer 2：大学入門

角度をラジアンで表すと、半径 $r$ の円で弧長 $s$ が切り取る角度は

$$
\theta = \frac{s}{r}
$$

と定義されます。したがって

$$
s=r\theta
$$

です。天体までの距離を $d$、天体の実直径を $D$、見かけの角直径を $\theta$ とすると、角度が十分小さい場合は

$$
D \simeq d\theta
$$

となります。ここで $\theta$ は必ず**ラジアン**です。

## Layer 3：大学天文学

厳密には、直径 $D$ の天体を中心から距離 $d$ で見る幾何は

$$
\tan\left(\frac{\theta}{2}\right)=\frac{D/2}{d}
$$

です。$|x|\ll1$ のとき $\tan x \simeq x$ なので、

$$
\frac{\theta}{2}\simeq\frac{D}{2d}
$$

から $D\simeq d\theta$ を得ます。

近似誤差は角度が大きいほど増えます。天文学で扱う秒角やミリ秒角は非常に小さいため、多くの場合に小角近似は十分高精度です。ただし、測定値の桁数より近似誤差が大きくないかは確認します。

## 角度の単位

一周は $360^\circ$ であり、ラジアンでは $2\pi$ です。

$$
360^\circ=2\pi\ \mathrm{rad}
$$

したがって、

$$
1^\circ=\frac{\pi}{180}\ \mathrm{rad}
$$

です。天文学では度より小さい角度を次のように表します。

$$
1^\circ=60\ \mathrm{arcmin}=3600\ \mathrm{arcsec}
$$

$$
1\ \mathrm{arcsec}=1000\ \mathrm{mas}
$$

秒角をラジアンへ直す換算は

$$
1\ \mathrm{arcsec}=\frac{\pi}{180\times3600}\ \mathrm{rad}
\simeq4.848\times10^{-6}\ \mathrm{rad}
$$

です。

## 導出を単位で検査する

$D\simeq d\theta$ で、ラジアンは「長さ / 長さ」から定義される無次元量です。したがって右辺の単位は距離 $d$ と同じになり、直径 $D$ の単位と一致します。

度や秒角をそのまま代入すると、数値は得られても物理的に誤った答えになります。式へ代入する前にラジアンへ直すことが必要です。

## 例題1：月の直径を推定する

月までの距離を $d=3.84\times10^5\ \mathrm{km}$、角直径を $\theta=0.50^\circ$ とします。

まずラジアンへ変換します。

$$
\theta=0.50\times\frac{\pi}{180}
\simeq8.73\times10^{-3}\ \mathrm{rad}
$$

小角近似へ代入すると、

$$
D\simeq(3.84\times10^5)(8.73\times10^{-3})
\simeq3.35\times10^3\ \mathrm{km}
$$

となります。月の直径の既知値約 $3.47\times10^3\ \mathrm{km}$ と近い値です。入力値を2桁で丸めたことや、地球と月の距離が変化することも差に含まれます。

## 例題2：秒角とパーセクを使う

1 pc 離れた位置で 1 AU が張る角度は、パーセクの定義により 1 秒角です。そのため小角近似は便利な形に書けます。

$$
D(\mathrm{AU})\simeq d(\mathrm{pc})\theta(\mathrm{arcsec})
$$

距離 $20\ \mathrm{pc}$、角直径 $0.50\ \mathrm{arcsec}$ の構造なら、

$$
D\simeq20\times0.50=10\ \mathrm{AU}
$$

です。この式では単位の組が固定されていることに注意してください。

## 実際の観測では何を測るか

検出器上の天体像は完全な点になりません。回折、大気の揺らぎ、追尾誤差、検出器の画素応答によって広がります。この広がりを**点像分布関数**（point spread function, PSF）としてモデル化します。

角直径を測るときは、観測像の幅からPSFの寄与を分離します。天体の見かけの幅がPSFとほぼ同じなら、単純な読み取りでは直径を決められません。

「画像に見える幅」と「天体固有の角直径」を区別することが、観測天文学の入口です。

## 分解能との接続

口径 $D_{\rm tel}$ の円形開口では、回折による代表的な角分解能は

$$
\theta_{\rm diff}\simeq1.22\frac{\lambda}{D_{\rm tel}}
$$

です。波長 $\lambda$ を短くするか、望遠鏡口径を大きくすると、より小さな角度を区別できます。

ただし地上観測では大気、実装された光学系、検出器、画像処理も効くため、この式だけで最終性能は決まりません。

## 不確かさ

$D=d\theta$ で $d$ と $\theta$ が独立なら、小さな不確かさに対して相対不確かさはおおよそ

$$
\left(\frac{\sigma_D}{D}\right)^2
\simeq
\left(\frac{\sigma_d}{d}\right)^2+
\left(\frac{\sigma_\theta}{\theta}\right)^2
$$

です。距離が1%、角度が2%の精度なら、直径の相対不確かさは単純な3%ではなく、

$$
\sqrt{0.01^2+0.02^2}\simeq0.022
$$

すなわち約2.2%です。誤差伝播は後のレッスンで導出します。

## よくある誤り

**度をラジアンへ直さず式へ代入する。**  
小角近似の角度はラジアンです。

**角半径と角直径を混同する。**  
資料が半径と直径のどちらを示しているか確認します。

**画像の画素数をそのまま角度と考える。**  
画素スケール、光学歪み、PSFの校正が必要です。

**有効数字を測定精度以上に残す。**  
計算機が多くの桁を返しても、入力値より詳しい情報が増えたわけではありません。

## 独力演習

1. $0.25^\circ$ は何秒角ですか。
2. $30^\circ$ をラジアンへ変換してください。
3. 距離 $400\ \mathrm{pc}$ にあり、角直径が $2.0\ \mathrm{arcsec}$ の円盤の直径をAUで求めてください。
4. 同じ天体を2倍遠くへ置くと、角直径は何倍になりますか。
5. 小角近似がラジアンを要求する理由を、式と単位を使って説明してください。

## 演習解答

1. $0.25\times3600=900\ \mathrm{arcsec}$。
2. $30\times\pi/180=\pi/6\simeq0.524\ \mathrm{rad}$。
3. $D(\mathrm{AU})\simeq400\times2.0=800\ \mathrm{AU}$。
4. $D$ が一定で $\theta\simeq D/d$ なので、角直径は $1/2$。
5. ラジアンは $\theta=s/r$ と長さの比で定義されるため、$s=r\theta$ が追加の換算係数なしに成立します。

## 次の章とのつながり

角度を距離へ変えるには、もう一つの幾何が必要です。次の「年周視差から距離を測る」では、地球公転軌道の既知の長さと恒星の方向変化から、パーセク単位の距離式を導きます。
