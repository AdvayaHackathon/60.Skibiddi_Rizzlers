import 'package:flutter/material.dart';
import 'package:flutter_gemini/flutter_gemini.dart';

class FestivalFinderScreen extends StatefulWidget {
  const FestivalFinderScreen({super.key});

  @override
  State<FestivalFinderScreen> createState() => _FestivalFinderScreenState();
}

class _FestivalFinderScreenState extends State<FestivalFinderScreen> {
  final TextEditingController destinationController = TextEditingController();
  final TextEditingController dateController = TextEditingController();

  String result = '';
  bool isLoading = false;

  Future<void> findFestivals() async {
    final destination = destinationController.text.trim();
    final dates = dateController.text.trim();

    if (destination.isEmpty && dates.isEmpty) return;

    setState(() {
      isLoading = true;
    });

    final prompt = '''
You're a travel festival expert. Based on the user's input, suggest trending festivals.

User Input:
Destination: ${destination.isNotEmpty ? destination : 'Not specified'}
Dates: ${dates.isNotEmpty ? dates : 'Not specified'}

If a destination is provided, list the top 3 festivals happening there around those dates.
If only dates are given, suggest the best places to visit for major festivals during that period.

For each festival, include:
- Festival Name
- Location
- Dates
- Highlights
- Travel Tips

Do NOT use symbols like asterisks (***). Just use clear section titles and spacing for readability.
Use this format (with no extra line breaks):

Festival 1: [Festival Name]
Location: 
Dates: 
Highlights: 
Tips: 

Repeat for 3 festivals.
''';

    try {
      final gemini = Gemini.instance;
      final response = await gemini.text(prompt);

      setState(() {
        result = response?.output ?? 'No response received.';
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        result = 'Error generating festivals: $e';
        isLoading = false;
      });
    }
  }

  List<InlineSpan> _formatText(String text) {
    final lines = text.split('\n');
    return lines.where((line) => line.trim().isNotEmpty).map((line) {
      final trimmed = line.trim();
      final isBold = trimmed.startsWith('Festival') ||
          trimmed.startsWith('Location:') ||
          trimmed.startsWith('Dates:') ||
          trimmed.startsWith('Highlights:') ||
          trimmed.startsWith('Tips:');

      return TextSpan(
        text: '$trimmed\n',
        style: TextStyle(
          fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
          fontSize: 16,
          height: 1.4,
          color: Colors.black,
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Festival Finder"),
        backgroundColor: const Color(0xFF6A5AE0),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            const Text(
              'Enter Destination (optional)',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: destinationController,
              decoration: InputDecoration(
                hintText: 'e.g. Japan, Spain, Brazil',
                filled: true,
                fillColor: Colors.grey[200],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Enter Travel Dates (optional)',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: dateController,
              decoration: InputDecoration(
                hintText: 'e.g. July 1 - July 10, 2025',
                filled: true,
                fillColor: Colors.grey[200],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: isLoading ? null : findFestivals,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF6A5AE0),
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text("Find Festivals", style: TextStyle(fontSize: 16)),
            ),
            const SizedBox(height: 30),
            if (result.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(16),
                ),
                child: SelectableText.rich(
                  TextSpan(children: _formatText(result)),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
