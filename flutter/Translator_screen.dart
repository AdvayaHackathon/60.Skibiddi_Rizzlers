import 'package:flutter/material.dart';
import 'package:translator/translator.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

class TranslatorScreen extends StatefulWidget {
  @override
  _TranslatorScreenState createState() => _TranslatorScreenState();
}

class _TranslatorScreenState extends State<TranslatorScreen> {
  final TextEditingController _controller = TextEditingController();
  final translator = GoogleTranslator();
  final FlutterTts flutterTts = FlutterTts();
  late stt.SpeechToText _speech;
  bool _isListening = false;

  String translatedText = '';
  String selectedLanguageCode = 'es'; // Default: Spanish

  final Map<String, String> languages = {
    'Spanish': 'es',
    'French': 'fr',
    'German': 'de',
    'Hindi': 'hi',
    'Japanese': 'ja',
    'Chinese (Simplified)': 'zh-cn',
    'Arabic': 'ar',
    'Korean': 'ko',
  };

  @override
  void initState() {
    super.initState();
    _speech = stt.SpeechToText();
  }

  Future<void> _translateText() async {
    if (_controller.text.trim().isEmpty) return;
    var translation = await translator.translate(_controller.text, to: selectedLanguageCode);
    setState(() {
      translatedText = translation.text;
    });
  }

  Future<void> _speakText(String text) async {
    await flutterTts.setLanguage(selectedLanguageCode);
    await flutterTts.speak(text);
  }

  Future<void> _listen() async {
    if (!_isListening) {
      bool available = await _speech.initialize();
      if (available) {
        setState(() => _isListening = true);
        _speech.listen(onResult: (result) {
          setState(() {
            _controller.text = result.recognizedWords;
          });
        });
      }
    } else {
      setState(() => _isListening = false);
      _speech.stop();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Translator")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      labelText: 'Enter text',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(_isListening ? Icons.mic_off : Icons.mic),
                  onPressed: _listen,
                ),
              ],
            ),
            SizedBox(height: 16),
            DropdownButton<String>(
              value: selectedLanguageCode,
              isExpanded: true,
              items: languages.entries.map((entry) {
                return DropdownMenuItem<String>(
                  value: entry.value,
                  child: Text(entry.key),
                );
              }).toList(),
              onChanged: (val) {
                setState(() => selectedLanguageCode = val!);
              },
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: _translateText,
              child: Text('Translate'),
            ),
            SizedBox(height: 16),
            if (translatedText.isNotEmpty) ...[
              Text(
                'Translation:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text(translatedText, style: TextStyle(fontSize: 18)),
              SizedBox(height: 8),
              ElevatedButton.icon(
                onPressed: () => _speakText(translatedText),
                icon: Icon(Icons.volume_up),
                label: Text("Speak"),
              )
            ]
          ],
        ),
      ),
    );
  }
}
