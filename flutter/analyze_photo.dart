import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_gemini/flutter_gemini.dart';
import 'dart:convert';


class AnalyzePhotoScreen extends StatefulWidget {
  const AnalyzePhotoScreen({super.key});

  @override
  State<AnalyzePhotoScreen> createState() => _AnalyzePhotoScreenState();
}

class _AnalyzePhotoScreenState extends State<AnalyzePhotoScreen> {
  String? _fileName;
  String? _rawResponse;
  bool _isLoading = false;
  Map<String, dynamic>? _analysis;

  Future<void> _pickImageAndAnalyze() async {
    setState(() {
      _isLoading = true;
      _fileName = null;
      _rawResponse = null;
      _analysis = null;
    });

    try {
      final result = await FilePicker.platform.pickFiles(type: FileType.image);
      if (result == null || result.files.isEmpty) {
        setState(() => _isLoading = false);
        return;
      }

      final file = result.files.first;
      setState(() => _fileName = file.name);

      final gemini = Gemini.instance;
      final prompt =
          "You are given an image file named '${file.name}'. Based on this file name, guess what place or landmark the image might represent. "
          "Provide fun facts and general information assuming it's a popular place. "
          "Structure the response as a JSON object with these keys: name, location, funFacts (list), culturalSignificance (text), travelTips (list).";

      final response = await gemini.text(prompt);

      if (response?.output != null) {
        setState(() {
          _rawResponse = response!.output;
          _analysis = _parseResponse(response.output!);
          _isLoading = false;
        });
      } else {
        throw Exception("No output from Gemini");
      }
    } catch (e) {
      print('Error: $e');
      setState(() {
        _isLoading = false;
        _rawResponse = 'Error: $e';
      });
    }
  }

  Map<String, dynamic> _parseResponse(String text) {
    text = text.replaceAll('```json', '').replaceAll('```', '').trim();
    try {
      return jsonDecode(text);

    } catch (_) {
      // fallback: attempt manual parsing like you do in itinerary
      return _fallbackParse(text);
    }
  }

  Map<String, dynamic> _fallbackParse(String text) {
    final Map<String, dynamic> result = {};
    String? currentKey;
    List<String> currentList = [];

    for (var line in text.split('\n')) {
      line = line.trim();
      if (line.isEmpty) continue;

      if (line.endsWith(':') && !line.contains('•') && !line.contains('-')) {
        if (currentKey != null) {
          result[currentKey] = currentList.isEmpty ? 'No details' : currentList;
          currentList = [];
        }
        currentKey = line.replaceAll(':', '');
      } else {
        currentList.add(line.replaceFirst(RegExp(r'^[-•]'), '').trim());
      }
    }

    if (currentKey != null) {
      result[currentKey] = currentList.isEmpty ? 'No details' : currentList;
    }

    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Analyze Image')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            ElevatedButton.icon(
              onPressed: _isLoading ? null : _pickImageAndAnalyze,
              icon: const Icon(Icons.upload_file),
              label: const Text("Upload Image and Analyze"),
            ),
            const SizedBox(height: 16),
            if (_fileName != null) Text("File: $_fileName"),
            const SizedBox(height: 24),
            if (_isLoading)
              const CircularProgressIndicator()
            else if (_analysis != null || _rawResponse != null)
              Expanded(
                child: SingleChildScrollView(
                  child: _buildAnalysisDisplay(),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildAnalysisDisplay() {
    if (_analysis != null) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: _analysis!.entries.map((entry) {
          final key = entry.key;
          final value = entry.value;
          return Card(
            margin: const EdgeInsets.only(bottom: 16),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    key,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  if (value is List)
                    ...value.map((item) => Text('• $item')).toList()
                  else
                    Text(value.toString()),
                ],
              ),
            ),
          );
        }).toList(),
      );
    } else {
      return Text(_rawResponse ?? 'No data.');
    }
  }
}
