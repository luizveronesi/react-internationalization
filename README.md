# React Internationalization

React example containing an internationalization implementation using react-i18next and react-country-flag.

## Installation

```bash
# Clone the repository
git clone https://github.com/luizveronesi/react-internationalization.git

# Navigate to the project directory
cd react-internationalization

# Install dependencies
npm install
```

```bash
# Docker installation
docker build . -t react-internationalization:latest
docker create --name react-internationalization --network your-network --ip x.x.x.x --restart unless-stopped roboto-node:latest
docker start react-internationalization
```

## Usage

```bash
# Run the application
npm start
```

To use in your code, add the next import to each file and create a constant variable using the hook, which represents the available function to reach the texts.

```bash
import { useTranslation, Trans } from 'react-i18next';
```

### Regular Usage

#### Single file:

```bash
const { t } = useTranslation('home');
const text = t('label.choose.language');
```

#### Multiple files:

```bash
const { t } = useTranslation(['home', 'footer']);
const text = t('home:label.choose.language');
```

The 't' function requires one single parameter which corresponds to the key defined in one or multiple files.

At this example, useTranslation requires the definition 'home' and the message 'label.choose.language'.

|                       Action |            Type             | Location                                                                                                                                                                                                                                   |
| ---------------------------: | :-------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                       `home` |       File definition       | Defined at file src/configs/Localization.ts for each language.                                                                                                                                                                             |
|      `label.choose.language` |  Message for a single file  | Key for the message set at each file defined at Localization.ts. This message must exist in at least one of the files set on the hook. In this example, the key is at src/configs/localization/HomeTexts.ts                                |
| `home:label.choose.language` | Message for a multiple file | When using multiple files, the message must define to which file it corresponds. The prefix 'home:' indicates the source.                                                                                                                  |
|      `fallback:text.example` |      Fallback message       | It is possible to use a fallback message source, which does not need to be declared at the hook. The prefix 'fallback' is an example, any value may be used, as long as it is set as src/configs/Localization.ts at attribute 'defaultNS'. |

### Trans Usage

The trans component is used to inject HTML code in the middle of the text message.

The user defined tag in the example (<bold>) is replaced by another tag as defined in the attribute components.

Any value may be passed to be used in the message and must be referenced with double brackes ({{ value }}).

```bash
<Trans
    t={t}
    i18nKey="home:trans.example"
    components={{ bold: <span className="bold" /> }}
    values={{ value: 10 }}
/>
```

```bash
'This example has a dynamic destacable <bold>{{value}}</bold> value in the middle of the text.',
```

More information may be found at https://react.i18next.com/latest/trans-component

## Demo

https://services.texugo.com.br/demo/react-internationalization
