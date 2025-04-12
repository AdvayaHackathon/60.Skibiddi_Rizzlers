import 'package:flutter/material.dart';
import 'package:flutter_gemini/flutter_gemini.dart';

class GenerateItineraryScreen extends StatefulWidget {
  final String destination;
  const GenerateItineraryScreen({super.key, required this.destination});

  @override
  State<GenerateItineraryScreen> createState() => _GenerateItineraryScreenState();
}

class _GenerateItineraryScreenState extends State<GenerateItineraryScreen> {
  final List<String> goals = ['Relaxation', 'Adventure', 'Culture', 'Romance', 'Family'];
  final List<String> experiences = ['Nature', 'City Life', 'History', 'Beaches', 'Food'];

  String? selectedGoal;
  String? selectedExperience;
  String result = '';
  bool isLoading = false;

  Future<void> generateItinerary() async {
    if (selectedGoal == null || selectedExperience == null) return;

    setState(() {
      isLoading = true;
    });

    final prompt = '''
Generate a 2-day travel itinerary for a trip to ${widget.destination}.
The travel goal is "$selectedGoal" and the preferred experience is "$selectedExperience".

The itinerary should:
1. Have a structured day-by-day breakdown (Day 1 and Day 2).
2. Include morning, afternoon, and evening plans.
3. Suggest places to visit, activities to do, and food spots aligned with the goal and experience.
4. Add local tips, estimated times, and nearby bonus attractions.

Keep the format clear and useful for someone planning their trip.
Use titles like: Day 1, Morning, Afternoon, Evening, Bonus Tips. 
Use line breaks between each section.
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
        result = 'Error generating itinerary: $e';
        isLoading = false;
      });
    }
  }

  List<InlineSpan> _formatText(String text) {
    final lines = text.split('\n');
    return lines.map((line) {
      final trimmed = line.trim();

      // Bold if line starts with these keywords
      final boldKeywords = ['Day ', 'Morning', 'Afternoon', 'Evening', 'Bonus', 'Tips', 'Optional'];
      final isBold = boldKeywords.any((kw) => trimmed.startsWith(kw));

      return TextSpan(
        text: '$trimmed\n\n',
        style: TextStyle(
          fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
          fontSize: 16,
          height: 1.5,
          color: Colors.black,
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Itinerary Generator"),
        backgroundColor: const Color(0xFF6A5AE0),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: [
            const Text(
              'Choose your goal',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 10,
              children: goals.map((goal) {
                return ChoiceChip(
                  label: Text(goal),
                  selected: selectedGoal == goal,
                  selectedColor: const Color(0xFF6A5AE0).withOpacity(0.2),
                  labelStyle: TextStyle(
                    color: selectedGoal == goal ? const Color(0xFF6A5AE0) : Colors.black87,
                  ),
                  backgroundColor: Colors.grey[200],
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  onSelected: (_) => setState(() => selectedGoal = goal),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),
            const Text(
              'Choose your experience',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 10,
              children: experiences.map((exp) {
                return ChoiceChip(
                  label: Text(exp),
                  selected: selectedExperience == exp,
                  selectedColor: const Color(0xFF6A5AE0).withOpacity(0.2),
                  labelStyle: TextStyle(
                    color: selectedExperience == exp ? const Color(0xFF6A5AE0) : Colors.black87,
                  ),
                  backgroundColor: Colors.grey[200],
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  onSelected: (_) => setState(() => selectedExperience = exp),
                );
              }).toList(),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: isLoading ? null : generateItinerary,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF6A5AE0),
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text("Generate Itinerary", style: TextStyle(fontSize: 16)),
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
